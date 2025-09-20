// app/page.tsx
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="bg-[#030308] text-white min-h-screen">
      <Hero />
      <Projects />
      <section id="contact" className="min-h-[40svh]" />
    </main>
  );
}
