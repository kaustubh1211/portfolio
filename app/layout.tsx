import { IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/src/components/layout/Navbar';

// IBM Plex Mono - Monospace font for the entire site
const ibmPlexMono = IBM_Plex_Mono({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm',
  display: 'swap',  
});

export const metadata = {
  title: 'Kaustubh - Full Stack Developer',
  description: 'Portfolio of Kaustubh, a full-stack web developer specializing in modern web technologies',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={ibmPlexMono.variable}>
      <body className={ibmPlexMono.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}