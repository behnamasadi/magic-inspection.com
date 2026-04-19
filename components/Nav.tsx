export default function Nav() {
  return (
    <header className="fixed top-0 right-0 z-30 flex h-16 items-center justify-end p-5 w-screen">
      <div className="grow" />
      <a
        href="#careers"
        className="mr-4 sm:mr-8 text-xl hover:underline underline-offset-8"
      >
        Careers
      </a>
      <a
        href="#contact"
        className="mr-4 sm:mr-8 text-xl hover:underline underline-offset-8"
      >
        Contact
      </a>
    </header>
  );
}
