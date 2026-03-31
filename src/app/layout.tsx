import type { Metadata } from "next";
import { Anton, Merriweather } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aayush Shrestha | Stand Up Comedian from Nepal",
  description:
    "Aayush Shrestha is a stand-up comedian from Kathmandu, Nepal. Co-founder of Comedy Tuk Tuk — the first stand-up comedy open mic in Nepal. Currently performing Mujibaad, Dark Dirty and Dangerous, and Gender In.Equality.",
  keywords: [
    "stand up comedian Nepal",
    "stand up comedian from Nepal",
    "Nepali stand up comedy",
    "comedy Kathmandu",
    "Aayush Shrestha comedian",
    "Aayush Shrestha",
    "AayushWho",
    "Mujibaad",
    "Comedy Tuk Tuk",
    "Laugh and Clap comedy",
    "Nepali comedian",
    "Nepal comedy show",
    "stand up comedy Kathmandu",
    "socio political comedy Nepal",
    "comedy Nepal tickets",
  ],
  authors: [{ name: "Aayush Shrestha", url: "https://aayushwho.me" }],
  creator: "Aayush Shrestha",
  metadataBase: new URL("https://aayushwho.me"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://aayushwho.me",
    title: "Aayush Shrestha | Stand Up Comedian from Nepal",
    description:
      "Stand-up comedy from Kathmandu. Socio-political commentary, live shows, and tour dates. Mujibaad, Dark Dirty and Dangerous, Gender In.Equality.",
    siteName: "Aayush Shrestha",
    images: [
      {
        url: "/images/hero-image.png",
        width: 1200,
        height: 630,
        alt: "Aayush Shrestha — Stand Up Comedian from Nepal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@aayush_who",
    creator: "@aayush_who",
    title: "Aayush Shrestha | Stand Up Comedian from Nepal",
    description:
      "Stand-up comedy from Kathmandu. Live shows, tour dates, and specials.",
    images: ["/images/hero-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${merriweather.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-serif bg-club-black text-club-gray-light bg-noise">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
