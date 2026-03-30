import type { Metadata } from "next";
import { Oswald, Merriweather } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
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
      className={`${oswald.variable} ${merriweather.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-serif bg-club-black text-club-gray-light bg-noise">
        {children}
      </body>
    </html>
  );
}
