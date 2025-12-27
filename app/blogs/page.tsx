
import React from 'react';
import type { Metadata } from 'next';
import BlogSection from '@/src/components/sections/BlogSection';

export const metadata: Metadata = {
  title: 'Blog - Web Development Insights & Tutorials | Kaustubh',
  description: 'Expert articles on Next.js, React, Flutter, TypeScript, and modern web development. Learn best practices, performance optimization, and advanced techniques.',
  keywords: ['Next.js', 'React', 'Web Development', 'TypeScript', 'JavaScript', 'Performance', 'Tutorial'],
  openGraph: {
    title: 'Blog - Web Development Insights & Tutorials | Kaustubh',
    description: 'Expert articles on Next.js, React, Flutter, and modern web development',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Web Development Insights & Tutorials | Kaustubh',
    description: 'Expert articles on Next.js, React, Flutter, and modern web development',
  },
};

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const params = await searchParams;
  
  return <BlogSection searchParams={params} />;
}