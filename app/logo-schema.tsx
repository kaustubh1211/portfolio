export default function LogoSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Kaustubh",
          "url": "https://www.kaustubhp.in",
          "logo": "https://www.kaustubhp.in/image.png"
        }),
      }}
    />
  );
}
