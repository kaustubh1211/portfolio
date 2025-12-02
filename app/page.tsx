import React from 'react';
import Hero from '@/src/components/sections/HeroSection';
import Experience from '@/src/components/sections/Experince';
import type { Metadata } from 'next';
import Navbar from '@/src/components/layout/Navbar';
import GitHubActivity from '@/src/components/sections/GithubShowCase';

export const metadata: Metadata = {
  title: 'Kaustubh- Full Stack Web Developer',
  description: 'Portfolio of Ram, a full-stack web developer specializing in React, Next.js, TypeScript, and modern web technologies.',
  keywords: ['web developer', 'react', 'nextjs', 'typescript', 'portfolio', 'full stack'],
  authors: [{ name: 'kaustubh' }],
  openGraph: {
    title: 'Kaustubh - Full Stack Web Developer',
    description: 'Full-stack web developer specializing in React and Next.js',
    type: 'website',
  },
};

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar/>
      <Hero />
      <GitHubActivity/>
      <Experience />
      {/* Add more sections here */}
      {/* <Projects /> */}
      {/* <Skills /> */}
      {/* <Contact /> */}
    </main>
  );
} 