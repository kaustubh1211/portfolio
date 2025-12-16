import { IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/src/components/layout/Navbar';
import { ViewTransitions } from 'next-view-transitions';
import { ThemeProvider } from '@/src/components/providers/themeProvider';
import Script from "next/script";
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
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
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
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}