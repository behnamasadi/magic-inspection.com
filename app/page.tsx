import Nav from "@/components/Nav";
import TravelBoard from "@/components/TravelBoard";
import CopyrightBar from "@/components/CopyrightBar";

export default function HomePage() {
  return (
    <main className="relative h-screen w-screen overflow-hidden text-light">
      <div className="particles" aria-hidden />
      <Nav />
      <TravelBoard />
      <CopyrightBar />
    </main>
  );
}
