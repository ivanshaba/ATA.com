import type { Metadata } from "next";

export const siteConfig = {
  name: "ATA",
  description: "ATA delivers professional HVAC solutions in Uganda, providing industrial and commercial cooling systems for factories, offices, and large buildings.",
  url: "https://ata.com",
  ogImage: "/madaga.png",
  logo: "/madaga.png",
  keywords: [
    "HVAC solutions",
    "air conditioning",
    "industrial cooling",
    "commercial HVAC",
    "air conditioning installation",
    "energy-efficient HVAC",
    "ATA Uganda",
    "HVAC maintenance"
  ],
  authors: [
    {
      name: "ATA Team",
      url: "https://ata.com",
    },
  ],
  creator: "ATA",
  publisher: "ATA",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ata.com",
    siteName: "ATA",
    title: "ATA - Professional HVAC Solutions in Uganda",
    description: "ATA delivers professional HVAC solutions in Uganda, providing industrial and commercial cooling systems for factories, offices, and large buildings.",
    images: [
      {
        url: "/madaga.png",
        width: 1200,
        height: 630,
        alt: "ATA - Professional HVAC Solutions in Uganda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ATA - Professional HVAC Solutions in Uganda",
    description: "ATA delivers professional HVAC solutions in Uganda, providing industrial and commercial cooling systems for factories, offices, and large buildings.",
    images: ["/madaga.png"],
    creator: "@ata",
  },
  verification: {
    google: "your-google-verification-code", 
  },
  alternates: {
    canonical: "https://ata.com",
  },
  category: "industrial-services",
};


export const pageMetadata = {
  home: {
    title: "ATA - Professional HVAC Solutions in Uganda",
    description: "ATA provides industrial and commercial HVAC systems, energy-efficient air conditioning solutions, and expert maintenance services in Uganda.",
    keywords: [
      "HVAC solutions",
      "industrial cooling",
      "air conditioning installation",
      "commercial HVAC",
      "ATA Uganda",
      "HVAC maintenance"
    ],
    openGraph: {
      title: "ATA - Professional HVAC Solutions in Uganda",
      description: "ATA provides industrial and commercial HVAC systems, energy-efficient air conditioning solutions, and expert maintenance services in Uganda.",
      url: "https://ata.com",
      type: "website",
    },
    twitter: {
      title: "ATA - Professional HVAC Solutions in Uganda",
      description: "ATA provides industrial and commercial HVAC systems, energy-efficient air conditioning solutions, and expert maintenance services in Uganda.",
    },
    alternates: {
      canonical: "https://ata.com",
    },
  },
  about: {
    title: "About ATA - HVAC Solutions Uganda",
    description: "Learn about ATA's expertise in HVAC solutions in Uganda. We specialize in installing, maintaining, and servicing industrial and commercial air conditioning systems.",
    keywords: [
      "ATA",
      "HVAC solutions",
      "air conditioning services",
      "industrial cooling",
      "commercial HVAC",
      "company culture",
      "team expertise"
    ],
    openGraph: {
      title: "About ATA - HVAC Solutions Uganda",
      description: "Learn about ATA's expertise in HVAC solutions in Uganda. We specialize in installing, maintaining, and servicing industrial and commercial air conditioning systems.",
      url: "https://ata.com/about",
      type: "website",
    },
    twitter: {
      title: "About ATA - HVAC Solutions Uganda",
      description: "Learn about ATA's expertise in HVAC solutions in Uganda. We specialize in installing, maintaining, and servicing industrial and commercial air conditioning systems.",
    },
    alternates: {
      canonical: "https://ata.com/about",
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "ATA",
      description: "ATA delivers professional HVAC solutions in Uganda for industrial and commercial clients.",
      url: "https://ata.com",
      logo: "/madaga.png",
      foundingDate: "2016",
      numberOfEmployees: "20-50",
      address: {
        "@type": "PostalAddress",
        addressCountry: "UG"
      },
      sameAs: [
        "https://linkedin.com/company/ata",
        "https://twitter.com/ata"
      ],
      knowsAbout: [
        "HVAC Solutions",
        "Industrial Cooling",
        "Commercial Air Conditioning",
        "Energy-Efficient HVAC"
      ]
    }
  },
  blog: {
    title: "ATA HVAC Insights & Research",
    description: "Stay updated with the latest trends, guides, and insights in industrial and commercial HVAC solutions in Uganda.",
    keywords: [
      "HVAC blog",
      "industrial cooling insights",
      "air conditioning guides",
      "HVAC trends",
      "ATA Uganda",
      "energy-efficient HVAC"
    ],
    openGraph: {
      title: "ATA HVAC Insights & Research",
      description: "Stay updated with the latest trends, guides, and insights in industrial and commercial HVAC solutions in Uganda.",
      url: "https://ata.com/blog",
      type: "website",
    },
    twitter: {
      title: "ATA HVAC Insights & Research",
      description: "Stay updated with the latest trends, guides, and insights in industrial and commercial HVAC solutions in Uganda.",
    },
    alternates: {
      canonical: "https://ata.com/blog",
    },
  },
};

export function generatePageMetadata(
  page: keyof typeof pageMetadata,
  customMetadata?: Partial<Metadata>
): Metadata {
  const baseMetadata = pageMetadata[page];
  
  return {
    title: baseMetadata.title,
    description: baseMetadata.description,
    keywords: baseMetadata.keywords,
    openGraph: {
      ...siteConfig.openGraph,
      ...baseMetadata.openGraph,
    },
    twitter: {
      ...siteConfig.twitter,
      ...baseMetadata.twitter,
    },
    alternates: baseMetadata.alternates,
    robots: siteConfig.robots,
    verification: siteConfig.verification,
    ...customMetadata,
  };
}

export function generateBlogPostMetadata(
  title: string,
  description: string,
  publishedTime: string,
  slug: string,
  image?: string
): Metadata {
  const blogUrl = `https://ata.com/blog/${slug}`;
  const ogImage = image || siteConfig.ogImage;

  return {
    title: `${title} - ATA Blog`,
    description,
    keywords: [
      ...siteConfig.keywords,
      "HVAC blog post",
      "air conditioning article",
      "industrial cooling insights"
    ],
    openGraph: {
      ...siteConfig.openGraph,
      title: `${title} - ATA Blog`,
      description,
      url: blogUrl,
      type: "article",
      publishedTime,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      ...siteConfig.twitter,
      title: `${title} - ATA Blog`,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: blogUrl,
    },
    robots: siteConfig.robots,
  };
}

export function generateBlogPostStructuredData(
  title: string,
  description: string,
  publishedTime: string,
  slug: string,
  author?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    datePublished: publishedTime,
    dateModified: publishedTime,
    description,
    url: `https://ata.com/blog/${slug}`,
    author: {
      "@type": "Person",
      name: author || "ATA Team",
    },
    publisher: {
      "@type": "Organization",
      name: "ATA",
      logo: {
        "@type": "ImageObject",
        url: siteConfig.logo,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://ata.com/blog/${slug}`,
    },
  };
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,
  robots: siteConfig.robots,
  openGraph: siteConfig.openGraph,
  twitter: siteConfig.twitter,
  verification: siteConfig.verification,
  alternates: siteConfig.alternates,
  category: siteConfig.category,
};
