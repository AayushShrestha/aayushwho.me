import Hero from "@/components/Hero";
import Bio from "@/components/Bio";

export default function Home() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center bg-club-black selection:bg-club-red selection:text-white relative z-10 w-full">
      <Hero />
      <Bio />
    </main>
  );
}
