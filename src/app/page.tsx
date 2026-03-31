import Hero from "@/components/Hero";
import Tours from "@/components/Tours";
import Specials from "@/components/Specials";
import InnerCircleBar from "@/components/InnerCircleBar";
import Showcase from "@/components/Showcase";
import PPV from "@/components/PPV";
import Merch from "@/components/Merch";
import Connectivity from "@/components/Connectivity";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aayush Shrestha",
  alternateName: "AayushWho",
  url: "https://aayushwho.me",
  jobTitle: "Stand-Up Comedian",
  description:
    "Stand-up comedian from Kathmandu, Nepal. Co-founder of Comedy Tuk Tuk, the first stand-up comedy open mic in Nepal. Socio-political commentary with aloofness and silliness.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kathmandu",
    addressCountry: "NP",
  },
  sameAs: [
    "https://www.youtube.com/@AayushWho",
    "https://www.instagram.com/aayush_who/",
    "https://x.com/aayush_who",
    "https://www.facebook.com/AayushWho/",
    "https://www.tiktok.com/@aayush_who",
    "https://www.linkedin.com/in/aayush-who/",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex min-h-dvh flex-col items-center bg-club-black selection:bg-club-red selection:text-white relative z-10 w-full">
      <Hero />
      <Tours />
      <Specials />
      <InnerCircleBar />
      <Showcase />
      <PPV />
      <Merch />
      <Connectivity />
      </main>
    </>
  );
}
