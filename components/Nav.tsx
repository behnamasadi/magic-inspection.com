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
      <a
        href="#careers"
        className="mr-4 sm:mr-8 text-xl hover:underline underline-offset-8"
      >
        Careers
      </a>
      <a
        href="#contact"
        className="text-xl hover:underline underline-offset-8"
      >
        Contact
      </a>
    </header>
  );
}
