import Logo from "./Logo";

export default function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex h-16 items-center px-5 w-screen">
      <a href="#top" className="flex items-center gap-2" aria-label="Home">
        <span className="block h-10 w-10">
          <Logo fill iconOnly />
        </span>
      </a>
      <div className="grow" />
      <nav className="flex items-center gap-6 text-sm">
        <a
          href="https://demo.magic-inspection.com/"
          className="text-light hover:text-[color:var(--accent)] transition-colors"
        >
          Demo
        </a>
        <a
          href="https://app.magic-inspection.com/"
          className="nav-cta"
        >
          Open app
        </a>
      </nav>
    </header>
  );
}
