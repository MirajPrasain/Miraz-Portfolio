// app/page.tsx
import Hero from "@/components/Hero";
import Bitebit from "@/components/Bitebit";
import AirPilot from "@/components/AirPilot";
import FocusAgent from "@/components/FocusAgent";

export default function Home() {
  return (
    <main className="bg-[#030308] text-white min-h-screen">
      <Hero />
      <Bitebit />
      <AirPilot />
      <FocusAgent />
      <section id="contact" className="min-h-[40svh]" />
    </main>
  );
}
