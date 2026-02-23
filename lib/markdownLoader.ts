export interface BlogPostMetadata {
  title: string;
  subtitle: string;
  readTime: string;
  publishDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
  keyTakeaways: string[];
  breadcrumbs: Array<{
    label: string;
    href: string;
  }>;
  image?: string;
  tag?: string;
}

export interface BlogPostContent {
  metadata: BlogPostMetadata;
  content: string;
  headings: Array<{
    level: number;
    text: string;
    id: string;
    href: string;
  }>;
}

const blogPostMetadata: Record<string, BlogPostMetadata> = {
  "future-ai-business-comprehensive-guide": {
    title: "Choosing the Right HVAC System for Commercial Buildings in Kampala",
    subtitle:
      "A practical guide to selecting efficient and reliable HVAC systems for offices, malls, and commercial buildings in Uganda.",
    readTime: "8 min read",
    publishDate: "Feb 12, 2026",
    author: {
      name: "Engineering Team",
      role: "HVAC Systems Specialist",
      avatar: "/api/placeholder/48/48",
      bio: "Our engineering team specializes in commercial and industrial HVAC system design, installation, and maintenance across Uganda.",
    },
    keyTakeaways: [
      "Proper HVAC sizing prevents energy waste and system failure",
      "Energy-efficient systems reduce long-term electricity costs",
      "Power protection is critical in Uganda’s grid conditions",
      "Regular maintenance extends HVAC system lifespan",
    ],
    breadcrumbs: [
      { label: "Resources", href: "/blog" },
      { label: "Commercial HVAC", href: "/blog?tag=commercial-hvac" },
    ],
    image: "https://res.cloudinary.com/dieth2xb3/image/upload/v1755804235/aaaimage_zbypst.png",
    tag: "Commercial HVAC",
  },

  "building-scalable-machine-learning-pipelines": {
    title: "Preventive HVAC Maintenance for Industrial Facilities in Uganda",
    subtitle:
      "How regular HVAC maintenance reduces downtime and improves system efficiency in factories and large facilities.",
    readTime: "7 min read",
    publishDate: "Feb 12, 2026",
    author: {
      name: "Service Department",
      role: "Industrial HVAC Maintenance Team",
      avatar: "/api/placeholder/48/48",
      bio: "Our maintenance division supports factories, warehouses, and production plants with professional HVAC servicing and duct optimization.",
    },
    keyTakeaways: [
      "Preventive maintenance reduces emergency breakdowns",
      "Duct cleaning improves airflow and air quality",
      "System inspections protect compressors and electrical components",
      "Maintenance contracts lower long-term operational costs",
    ],
    breadcrumbs: [
      { label: "Resources", href: "/blog" },
      { label: "Industrial HVAC", href: "/blog?tag=industrial-hvac" },
    ],
    image: "https://res.cloudinary.com/dieth2xb3/image/upload/v1755804235/aaaimage_zbypst.png",
    tag: "Industrial HVAC",
  },

  "custom-llm-development-concept-deployment": {
    title: "Upgrading Residential HVAC Systems in Kampala Homes",
    subtitle:
      "Why modern, energy-efficient air conditioning systems are essential for comfort and cost savings in Kampala residences.",
    readTime: "6 min read",
    publishDate: "Feb 12, 2026",
    author: {
      name: "Residential Projects Team",
      role: "Home Comfort Specialists",
      avatar: "/api/placeholder/48/48",
      bio: "Our residential team focuses on home HVAC upgrades, smart thermostat integration, and energy-efficient installations.",
    },
    keyTakeaways: [
      "Modern inverter systems reduce power consumption",
      "Smart thermostats improve comfort control",
      "Proper installation prevents uneven cooling",
      "Upgrading old systems lowers monthly energy bills",
    ],
    breadcrumbs: [
      { label: "Resources", href: "/blog" },
      { label: "Residential HVAC", href: "/blog?tag=residential-hvac" },
    ],
    image: "https://res.cloudinary.com/dieth2xb3/image/upload/v1755804235/aaaimage_zbypst.png",
    tag: "Residential HVAC",
  },
};


export const parseMarkdownHeadings = (markdown: string) => {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    headings.push({
      level,
      text,
      id,
      href: `#${id}`,
    });
  }

  return headings;
};

export const markdownToHTML = (markdown: string) => {
  const createId = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const html = markdown
    .replace(/^### (.*$)/gim, (_, text) => {
      const id = createId(text);
      return `<h3 id="${id}" class="scroll-mt-24 text-xl font-semibold mb-4 mt-8 text-foreground">${text}</h3>`;
    })
    .replace(/^## (.*$)/gim, (_, text) => {
      const id = createId(text);
      return `<h2 id="${id}" class="scroll-mt-24 text-2xl font-semibold mb-6 mt-10 text-foreground">${text}</h2>`;
    })
    .replace(/^# (.*$)/gim, (_, text) => {
      const id = createId(text);
      return `<h1 id="${id}" class="text-3xl font-bold mb-8 text-foreground">${text}</h1>`;
    })
    // Lists
    .replace(/^\- (.*$)/gim, '<li class="mb-2 text-muted-foreground">$1</li>')
    .replace(/(<li.*<\/li>)/g, '<ul class="list-disc list-inside mb-4 space-y-1">$1</ul>')
    // Paragraphs
    .replace(/^([^\n#*\-].*)$/gm, '<p class="mb-4 leading-7 text-muted-foreground">$1</p>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em class="italic text-foreground">$1</em>')
    // Code blocks
    .replace(
      /```([\s\S]*?)```/g,
      '<pre class="bg-muted p-4 rounded-lg overflow-x-auto mb-4"><code class="text-sm">$1</code></pre>'
    )
    .replace(/`([^`]+)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm font-mono">$1</code>');

  return html;
};


export const loadBlogPost = async (slug: string): Promise<BlogPostContent> => {
  try {
    let markdownContent = "";

    if (slug === "future-ai-business-comprehensive-guide") {
  markdownContent = `# Choosing the Right HVAC System for Commercial Buildings in Kampala

Commercial buildings in Kampala require reliable and energy-efficient HVAC systems to maintain comfort, protect equipment, and reduce electricity costs.

## Why HVAC Planning Matters

Uganda’s warm climate means cooling systems often operate throughout the year. Without proper planning, businesses may face:

- Rising electricity bills
- Frequent system breakdowns
- Poor indoor air quality
- Uneven cooling across offices

## Key Considerations Before Installation

### 1. Building Size and Load Requirements
Proper system sizing ensures efficient performance and prevents overworking compressors.

### 2. Energy Efficiency
Inverter systems and VRF technology significantly reduce long-term operating costs.

### 3. Power Protection
Voltage stabilizers and surge protection are essential to protect HVAC equipment.

### 4. Maintenance Planning
Regular servicing prevents downtime and extends equipment lifespan.

## Conclusion

Investing in the right HVAC system ensures long-term efficiency, improved air quality, and reliable performance for commercial buildings in Kampala.`;

 }
   else if (slug === "building-scalable-machine-learning-pipelines") {
  markdownContent = `# Preventive HVAC Maintenance for Industrial Facilities in Uganda

Industrial facilities rely on HVAC systems for temperature control, air quality, and equipment protection.

## Why Preventive Maintenance Is Important

Without routine servicing, industrial HVAC systems may experience:

- Reduced airflow
- Compressor failure
- Increased energy consumption
- Unplanned downtime

## Key Maintenance Activities

### Duct Cleaning
Removes dust buildup and improves airflow efficiency.

### Filter Replacement
Ensures clean indoor air and protects internal components.

### Electrical Inspection
Prevents damage caused by unstable power supply.

### Performance Testing
Identifies inefficiencies before they become costly problems.

## Conclusion

Preventive HVAC maintenance reduces downtime, improves system performance, and protects long-term investments in industrial facilities across Uganda.`;

    } else if (slug === "custom-llm-development-concept-deployment") {
  markdownContent = `# Upgrading Residential HVAC Systems in Kampala Homes

Homeowners in Kampala are increasingly upgrading to modern HVAC systems to improve comfort and reduce electricity costs.

## Signs You Need an Upgrade

- High monthly electricity bills
- Uneven cooling between rooms
- Frequent breakdowns
- System older than 8–10 years

## Benefits of Modern HVAC Systems

### Energy Efficiency
Inverter air conditioners consume less power while maintaining consistent temperature.

### Smart Controls
Smart thermostats allow remote temperature adjustment and scheduling.

### Improved Air Quality
Modern systems include advanced filtration for healthier indoor environments.

## Conclusion

Upgrading your residential HVAC system improves comfort, reduces operating costs, and increases the overall efficiency of your home.`;
}

     else {
      // Default content for unknown slugs
      markdownContent = `# Blog Post Not Found

The requested blog post could not be found. Please check the URL and try again.

## What to do next?

- Return to the [blog listing](/blog)
- Search for other articles
- Contact us if you believe this is an error`;
    }

    const metadata = blogPostMetadata[slug] || {
      title: "Blog Post Not Found",
      subtitle: "The requested blog post could not be found.",
      readTime: "1 min read",
      publishDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      author: {
        name: "ATA Team",
        role: "Content Team",
        avatar: "/api/placeholder/48/48",
        bio: "The ATA team creates content to help businesses understand and implement AI solutions.",
      },
      keyTakeaways: ["The requested blog post could not be found"],
      breadcrumbs: [
        { label: "Resources", href: "/blog" },
        { label: "Blog", href: "/blog" },
      ],
    };

    const headings = parseMarkdownHeadings(markdownContent);
    const htmlContent = markdownToHTML(markdownContent);

    return {
      metadata,
      content: htmlContent,
      headings,
    };
  } catch (error) {
    console.error("Error loading blog post:", error);
    throw new Error("Failed to load blog post");
  }
};
