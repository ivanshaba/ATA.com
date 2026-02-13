export interface BlogPost {
  id: string;
  title: string;
  date: string;
  tag: string;
  image: string;
  excerpt: string;
  slug: string;
  isTopPick?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Why Proper Air Conditioning Is Essential for Offices in Kampala",
    date: "12 Feb 2026",
    tag: "Commercial HVAC",
    image: "/blogs/hvac1.jpg",
    excerpt:
      "With Kampala’s rising temperatures, reliable air conditioning is no longer a luxury but a necessity for productivity, comfort, and equipment protection in office spaces.",
    slug: "why-proper-air-conditioning-essential-offices-kampala",
    isTopPick: true,
  },
  {
    id: "2",
    title: "How to Reduce HVAC Energy Costs in Uganda",
    date: "10 Feb 2026",
    tag: "Energy Efficiency",
    image: "/blogs/hvac2.jpg",
    excerpt:
      "Learn practical ways businesses and homeowners in Uganda can lower electricity bills through smart HVAC upgrades and regular maintenance.",
    slug: "reduce-hvac-energy-costs-uganda",
    isTopPick: true,
  },
  {
    id: "3",
    title: "Common Air Conditioning Problems in Kampala Homes",
    date: "8 Feb 2026",
    tag: "Maintenance",
    image: "/blogs/hvac3.jpg",
    excerpt:
      "From refrigerant leaks to clogged filters, discover the most frequent AC issues affecting homes in Kampala and how to prevent costly repairs.",
    slug: "common-air-conditioning-problems-kampala-homes",
    isTopPick: true,
  },
  {
    id: "4",
    title: "Choosing the Right HVAC System for Your Commercial Building in Uganda",
    date: "6 Feb 2026",
    tag: "Commercial HVAC",
    image: "/blogs/hvac4.jpg",
    excerpt:
      "Selecting the right HVAC system for shopping malls, offices, and hotels in Uganda requires careful planning. Here’s what to consider.",
    slug: "choosing-right-hvac-system-commercial-building-uganda",
  },
  {
    id: "5",
    title: "The Importance of Regular HVAC Maintenance in Tropical Climates",
    date: "4 Feb 2026",
    tag: "Maintenance",
    image: "/blogs/hvac5.jpg",
    excerpt:
      "Uganda’s tropical climate puts extra strain on HVAC systems. Regular servicing ensures optimal performance and longer equipment lifespan.",
    slug: "importance-regular-hvac-maintenance-tropical-climates",
  },
  {
    id: "6",
    title: "Improving Indoor Air Quality in Kampala Offices",
    date: "2 Feb 2026",
    tag: "Indoor Air Quality",
    image: "/blogs/hvac6.jpg",
    excerpt:
      "Poor ventilation can impact employee health and productivity. Discover how proper HVAC design improves indoor air quality in busy office environments.",
    slug: "improving-indoor-air-quality-kampala-offices",
  },
  {
    id: "7",
    title: "How Power Fluctuations in Uganda Affect Your HVAC System",
    date: "30 Jan 2026",
    tag: "System Protection",
    image: "/blogs/hvac7.jpg",
    excerpt:
      "Frequent power fluctuations can damage HVAC equipment. Learn how surge protection and voltage stabilizers can safeguard your investment.",
    slug: "power-fluctuations-uganda-affect-hvac-system",
  },
  {
    id: "8",
    title: "Residential HVAC Upgrades: Are Smart Thermostats Worth It in Uganda?",
    date: "28 Jan 2026",
    tag: "Residential HVAC",
    image: "/blogs/hvac8.jpg",
    excerpt:
      "Smart thermostats are gaining popularity in Uganda. Here’s how they help homeowners improve comfort and reduce electricity consumption.",
    slug: "residential-hvac-upgrades-smart-thermostats-uganda",
  },
  {
    id: "9",
    title: "HVAC Solutions for Hospitals and Clinics in Kampala",
    date: "26 Jan 2026",
    tag: "Specialized HVAC",
    image: "/blogs/hvac9.jpg",
    excerpt:
      "Healthcare facilities require strict air quality and temperature control standards. Learn how specialized HVAC systems support patient safety.",
    slug: "hvac-solutions-hospitals-clinics-kampala",
  },
  {
    id: "10",
    title: "Signs Your Air Conditioner Needs Immediate Repair",
    date: "24 Jan 2026",
    tag: "Maintenance",
    image: "/blogs/hvac10.jpg",
    excerpt:
      "Unusual noises, weak airflow, and rising power bills are warning signs. Here’s when to call an HVAC professional in Kampala.",
    slug: "signs-air-conditioner-needs-immediate-repair",
  },
  {
    id: "11",
    title: "Energy-Efficient Cooling Options for Ugandan Businesses",
    date: "22 Jan 2026",
    tag: "Energy Efficiency",
    image: "/blogs/hvac11.jpg",
    excerpt:
      "Explore modern cooling technologies designed to reduce operational costs while maintaining optimal comfort in Uganda’s climate.",
    slug: "energy-efficient-cooling-options-ugandan-businesses",
  },
  {
    id: "12",
    title: "Understanding HVAC Installation Costs in Kampala",
    date: "20 Jan 2026",
    tag: "Installation",
    image: "/blogs/hvac12.jpg",
    excerpt:
      "What affects HVAC installation pricing in Kampala? From system size to building layout, here’s what businesses and homeowners should know.",
    slug: "understanding-hvac-installation-costs-kampala",
  },
];


export const blogTags = [
  "All",
  "Commercial HVAC",
  "Residential HVAC",
  "Maintenance",
  "Energy Efficiency",
  "Indoor Air Quality",
  "System Protection",
  "Specialized HVAC",
  "Installation",
];
