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
  title: "AAYUSHWHO | Stand Up Comedian",
  description: "Raw, underground stand-up comedy and socio-political commentary by Aayush Shrestha.",
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
