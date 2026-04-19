# magic-inspection.com — common development + deployment commands
# Run `make help` for the full list.

.PHONY: help install dev build preview clean \
        deploy deploy-files deploy-vhost deploy-full \
        reload-nginx restart-nginx verify rollback \
        purge-cache ssh logs-access logs-error

# -----------------------------------------------------------------------------
# Config — override on the command line, e.g. `make deploy REMOTE_HOST=other`
# -----------------------------------------------------------------------------

REMOTE_LABEL  := pie-server
REMOTE_USER   := behnam
REMOTE_HOST   := 192.168.1.2
REMOTE_SSH    := $(REMOTE_USER)@$(REMOTE_HOST)
REMOTE_ROOT   := /var/www/magic-inspection-site
VHOST_SRC     := infra/nginx/magic-inspection.com.conf
VHOST_DST     := /etc/nginx/sites-available/magic-inspection.com
DOMAIN        := magic-inspection.com

# Sudo password comes from the local GNOME keyring.
# See /home/behnam/Documents/Linux Tips/sudo-over-ssh.md for setup.
SUDO_PW := secret-tool lookup service sudo host $(REMOTE_LABEL) user $(REMOTE_USER)
SSH     := ssh $(REMOTE_SSH)

# -----------------------------------------------------------------------------
# Local development
# -----------------------------------------------------------------------------

install:  ## npm install
	npm install

dev:  ## Run the Next.js dev server (http://localhost:3000)
	npm run dev

build:  ## Static export -> out/
	rm -rf .next out
	npm run build

preview: build  ## Build then serve out/ on http://localhost:8085
	@echo "==> serving out/ on http://localhost:8085 (Ctrl+C to stop)"
	cd out && python3 -m http.server 8085

clean:  ## Remove .next and out/
	rm -rf .next out

# -----------------------------------------------------------------------------
# Deployment to the Pi (files only, no nginx change)
# -----------------------------------------------------------------------------

deploy-files: build  ## Build and rsync the static site to the Pi
	@echo "==> rsync out/ -> $(REMOTE_SSH):$(REMOTE_ROOT)/"
	rsync -az --delete -e ssh out/ $(REMOTE_SSH):$(REMOTE_ROOT)/
	@echo "==> files deployed"

deploy: deploy-files verify  ## Build + rsync + verify. Use this for day-to-day content changes.

# -----------------------------------------------------------------------------
# Deploy the nginx vhost too (only needed when infra/nginx/*.conf changes)
# -----------------------------------------------------------------------------

deploy-vhost:  ## Upload $(VHOST_SRC) to the Pi (backs up existing vhost, tests, reloads)
	@test -f $(VHOST_SRC) || { echo "missing $(VHOST_SRC)"; exit 1; }
	@echo "==> uploading $(VHOST_SRC)"
	scp $(VHOST_SRC) $(REMOTE_SSH):/tmp/magic-inspection.com.conf.new >/dev/null
	@$(SUDO_PW) | $(SSH) 'sudo -S bash -c "set -e; \
	    TS=\$$(date +%Y%m%d-%H%M%S); \
	    cp $(VHOST_DST) $(VHOST_DST).bak-\$$TS; \
	    install -m 644 -o root -g root /tmp/magic-inspection.com.conf.new $(VHOST_DST); \
	    nginx -t; \
	    systemctl reload nginx; \
	    echo \"==> installed; backup=$(VHOST_DST).bak-\$$TS\""'

deploy-full: deploy-files deploy-vhost restart-nginx verify  ## Full deploy: files + vhost + restart + verify

# -----------------------------------------------------------------------------
# Nginx ops (remote)
# -----------------------------------------------------------------------------

reload-nginx:  ## Soft reload nginx on the Pi
	@$(SUDO_PW) | $(SSH) 'sudo -S systemctl reload nginx && echo ==> reloaded'

restart-nginx:  ## Full nginx restart on the Pi (use when reload doesn't pick up changes)
	@$(SUDO_PW) | $(SSH) 'sudo -S bash -c "systemctl restart nginx && systemctl is-active nginx"'

# -----------------------------------------------------------------------------
# Verification
# -----------------------------------------------------------------------------

verify:  ## curl the origin (bypass Cloudflare) and the public URL
	@echo "==> origin (direct, bypass Cloudflare):"
	@curl -sk --resolve $(DOMAIN):443:$(REMOTE_HOST) https://$(DOMAIN)/ \
	    -o /dev/null -w "    HTTP %{http_code}  size=%{size_download} bytes\n"
	@echo "==> public (through Cloudflare, cache-busted):"
	@curl -sI "https://$(DOMAIN)/?cb=$$(date +%s)" | head -1 | sed 's/^/    /'

# -----------------------------------------------------------------------------
# Rollback
# -----------------------------------------------------------------------------

rollback:  ## Restore the most recent vhost backup and reload nginx
	@$(SUDO_PW) | $(SSH) 'sudo -S bash -c "set -e; \
	    BAK=\$$(ls -t $(VHOST_DST).bak-* 2>/dev/null | head -1); \
	    if [ -z \"\$$BAK\" ]; then echo no backup found; exit 1; fi; \
	    cp \$$BAK $(VHOST_DST); \
	    nginx -t && systemctl reload nginx; \
	    echo \"==> restored from \$$BAK\""'

# -----------------------------------------------------------------------------
# Cloudflare cache purge (optional — needs a token with Cache Purge permission)
# -----------------------------------------------------------------------------

purge-cache:  ## Purge Cloudflare cache for $(DOMAIN) (requires CF token with Cache Purge scope)
	@CF_TOKEN=$$(secret-tool lookup service cloudflare user behnam.asadi@gmail.com); \
	if [ -z "$$CF_TOKEN" ]; then echo "no CF token in keyring"; exit 1; fi; \
	ZONE=$$(curl -s -H "Authorization: Bearer $$CF_TOKEN" \
	    "https://api.cloudflare.com/client/v4/zones?name=$(DOMAIN)" \
	    | python3 -c "import sys,json; print(json.load(sys.stdin)['result'][0]['id'])"); \
	echo "==> zone=$$ZONE"; \
	curl -s -H "Authorization: Bearer $$CF_TOKEN" -H "Content-Type: application/json" \
	    -X POST "https://api.cloudflare.com/client/v4/zones/$$ZONE/purge_cache" \
	    --data '{"purge_everything":true}' \
	    | python3 -m json.tool | head -12

# -----------------------------------------------------------------------------
# Misc
# -----------------------------------------------------------------------------

ssh:  ## Open an interactive SSH session to the Pi
	$(SSH)

logs-access:  ## Tail nginx access log (filtered to the apex)
	@$(SUDO_PW) | $(SSH) 'sudo -S tail -f /var/log/nginx/access.log'

logs-error:  ## Tail nginx error log
	@$(SUDO_PW) | $(SSH) 'sudo -S tail -f /var/log/nginx/error.log'

# -----------------------------------------------------------------------------
# Help
# -----------------------------------------------------------------------------

help:  ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
	    awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2}'
