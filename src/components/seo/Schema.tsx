import React from 'react';

export function Schema() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    "name": "Stronger Built LLC",
    "alternateName": "StrongerBuilt",
    "description": "Licensed California Public Works & DVBE Contractor specializing in construction, facility maintenance, and procurement intelligence.",
    "url": "https://www.strongerbuilt.us",
    "logo": "https://www.strongerbuilt.us/logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "hasCertification": [
      {
        "@type": "Certification",
        "name": "DVBE",
        "description": "Disabled Veteran Business Enterprise"
      },
      {
        "@type": "Certification",
        "name": "SDVOSB",
        "description": "Service-Disabled Veteran-Owned Small Business"
      }
    ],
    "areaServed": "California",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Stronger Built LLC",
      "priceRange": "$$",
      "telephone": "+1-800-STRONGER"
    }
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "BidIQ",
    "operatingSystem": "Web",
    "applicationCategory": "BusinessApplication",
    "description": "AI-driven procurement intelligence platform for California government contractors.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
    </>
  );
}
