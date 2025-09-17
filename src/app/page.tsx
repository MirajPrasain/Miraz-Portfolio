// app/page.tsx
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Hero />
      <Projects />
      <section id="contact" className="min-h-[40svh]" />
    </main>
  );
}
