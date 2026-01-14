import React from 'react';
import Hero from '@/src/components/sections/HeroSection';
import Experience from '@/src/components/sections/Experince';
import type { Metadata } from 'next';
import Navbar from '@/src/components/layout/Navbar';
import GitHubActivity from '@/src/components/sections/GithubShowCase';
import { ProjectorIcon } from 'lucide-react';
import Projects from '@/src/components/sections/Project';
import ContactForm from '@/src/components/sections/ContactForm';
import { TextHoverEffect } from '@/src/components/ui/Hovertext';
import { Footer } from '@/src/components/sections/FooterInfo';
import SmoothScroll from '@/src/components/ui/SmoothScrool';

export const metadata: Metadata = {
  title: "Kaustubh — Full Stack Web Developer",
  description:
    "Kaustubh is a full-stack web developer specializing in React, Next.js, TypeScript, Node.js, and modern web technologies.",
  keywords: [
    "Kaustubh",
    "web developer",
    "kaustubh portfolio",
    "full stack developer",
    "react developer",
    "nextjs developer",
    "javascript",
    "typescript",
    "portfolio",
  ],
  authors: [{ name: "Kaustubh" }],
  metadataBase: new URL("https://www.kaustubhp.in"),

  openGraph: {
    title: "Kaustubh — Full Stack Web Developer",
    description:
      "Portfolio of Kaustubh, a full-stack web developer skilled in React, Next.js, TypeScript, backend development, and UI engineering.",
    url: "https://www.kaustubhp.in",
    siteName: "Kaustubh Portfolio",
    images: [
      {
        url: "https://www.kaustubhp.in/image.png",
        width: 1200,
        height: 630,
        alt: "Kaustubh Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Kaustubh — Full Stack Web Developer",
    description:
      "Full-stack web developer specializing in React, Next.js, TypeScript and modern web development.",
    images: ["https://www.kaustubhp.in/image.png"],
  },

  alternates: {
    canonical: "https://www.kaustubhp.in",
  },
};



export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      <SmoothScroll>

      <Navbar/>
      <Hero />
      <Projects/>
      <GitHubActivity/>
      <Experience />
      <TextHoverEffect text='Kaustubh'/>
      <ContactForm/>
      <Footer/>
      </SmoothScroll>
    </main>
  );
}