import type { Metadata } from "next";
import { Inter, Cinzel, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CinematicCursor } from "@/components/ui/CinematicCursor";
import { CinematicLoader } from "@/components/ui/CinematicLoader";
import { identity } from "@/data/contact";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Cinzel({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${identity.name} — Full-Stack Developer`,
  description: identity.role,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-bg-deep">
      <body
        className={`${inter.variable} ${displayFont.variable} ${jetBrainsMono.variable} font-body antialiased selection:bg-red-accent/30 selection:text-white bg-bg-deep text-foreground cursor-none`}
      >
        <CinematicLoader />
        <CinematicCursor />
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
