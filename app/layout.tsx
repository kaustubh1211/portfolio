import { IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/src/components/layout/Navbar';
import { ViewTransitions } from 'next-view-transitions';
import { ThemeProvider } from '@/src/components/providers/themeProvider';
import Script from "next/script";
import LogoSchema from './logo-schema';
import { ClickSpark } from '@/src/components/ui/ClickSpark';
const ibmPlexMono = IBM_Plex_Mono({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm',
  display: 'swap',  
});

export const metadata = {
  title: 'Kaustubh - Full Stack Developer',
  description: 'Portfolio of Kaustubh, a full-stack web developer specializing in modern web technologies',
    icons: {
    icon: "https://www.kaustubhp.in/image.png",
    apple: "https://www.kaustubhp.in/image.png"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <head>
           <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Kaustubh",
              "url": "https://www.kaustubhp.in",
              "jobTitle": "Full Stack Web Developer",
              "knowsAbout": ["React", "Next.js", "TypeScript", "Node.js"],
              "sameAs": [
                "https://github.com/kaustubh1211",
                "https://www.linkedin.com/in/kaustubh-patil-8645b923a/"
              ]
            })
          }}
        />
          <LogoSchema/>
        </head>
        <body className={`${ibmPlexMono.variable} ${ibmPlexMono.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <Navbar />
              {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-WK1PGDSLG6`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WK1PGDSLG6');
          `}
        </Script>
        <ClickSpark
           sparkColor={undefined}
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
            enableColorCycle={true}  
            enableGlow={true}        
        />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}