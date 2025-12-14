import React from 'react';
import type { Metadata } from 'next';
import ComingSoon from '@/src/components/sections/BlogSection'
export const metadata: Metadata = {
  title: 'Blogs - Coming Soon | Kaustubh',
  description: 'Blog posts about web development, technology, and coding coming soon.',
};

export default function BlogsPage() {
  return <>
  <ComingSoon/>
  </>;
}