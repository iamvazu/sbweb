import { FAQItem } from "@/lib/data/faqs";

interface JsonLdProps {
  type: "Service" | "LocalBusiness" | "FAQPage" | "BreadcrumbList" | "Article";
  data: any;
}

export function JsonLd({ type, data }: JsonLdProps) {
  let schema: any = {};

  if (type === "Service") {
    schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": data.title,
      "description": data.description,
      "provider": {
        "@type": "LocalBusiness",
        "name": "Stronger Built Group LLC",
        "image": "https://www.strongerbuilt.us/logo.png",
        "teleprompt": "(831) 760-0806",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "4370 1/2 Oregon St",
          "addressLocality": "San Diego",
          "addressRegion": "CA",
          "postalCode": "92104",
          "addressCountry": "US"
        },
        "taxID": "39-4458240", // EIN
        "iso6523Code": "0088:1057434" // CSLB as identifier
      },
      "areaServed": {
        "@type": "State",
        "name": "California"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Government and Commercial Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": data.title
            }
          }
        ]
      }
    };
  }

  if (type === "FAQPage") {
    schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": data.map((item: FAQItem) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };
  }

  if (type === "LocalBusiness") {
    schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Stronger Built Group LLC",
      "image": "https://www.strongerbuilt.us/logo.png",
      "@id": "https://www.strongerbuilt.us",
      "url": "https://www.strongerbuilt.us",
      "telephone": "(831) 760-0806",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "4370 1/2 Oregon St",
        "addressLocality": "San Diego",
        "addressRegion": "CA",
        "postalCode": "92104",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 32.7574,
        "longitude": -117.1281
      },
      "taxID": "39-4458240",
      "iso6523Code": "0088:1057434",
      "knowsAbout": ["General Contracting", "DVBE Procurement", "California Public Works", "Facility Maintenance"],
      "certification": [
        {
          "@type": "Certification",
          "name": "CSLB #1057434",
          "certificationRating": "Active"
        },
        {
          "@type": "Certification",
          "name": "California DVBE/SB",
          "certificationRating": "Qualified"
        }
      ]
    };
  }

  if (type === "BreadcrumbList") {
    schema = data;
  }

  if (type === "Article") {
    schema = data;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
