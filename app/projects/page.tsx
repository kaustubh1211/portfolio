import Projects from '@/src/components/sections/Project'
import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Projects — Kaustubh | Full Stack Developer Portfolio",
  description:
    "Explore Kaustubh's web development projects including Techluminix Portfolio, Jeevandhara Admin Panel (E-Commerce + MLM), and Speaklingo language learning app. Built with React, Next.js, Node.js, and PostgreSQL.",
  keywords: [
    "web development projects",
    "react projects",
    "nextjs portfolio",
    "full stack projects",
    "ecommerce admin panel",
    "MLM system",
    "language learning app",
    "kaustubh projects",
    "developer portfolio",
    "node.js projects",
    "postgresql projects",
  ],
  openGraph: {
    title: "Projects — Kaustubh | Full Stack Developer",
    description:
      "View live projects: Techluminix company website, Jeevandhara E-Commerce Admin Panel with MLM, and Speaklingo language learning platform.",
    url: "https://www.kaustubhp.in/projects",
    siteName: "Kaustubh Portfolio",
    images: [
      {
        url: "https://www.kaustubhp.in/image.png", // Create this image
        width: 1200,
        height: 630,
        alt: "Kaustubh's Web Development Projects",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects — Kaustubh | Full Stack Developer",
    description:
      "Live projects showcasing expertise in React, Next.js, Node.js, PostgreSQL, and modern web development.",
    images: ["https://www.kaustubhp.in/image.png"],
  },
  alternates: {
    canonical: "https://www.kaustubhp.in/projects",
  },
}

export default function page() {
  return (
    <>
      <Projects/>
    </>
  )
}