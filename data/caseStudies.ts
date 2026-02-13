export const caseStudies = [
  {
    main_image_src: "/two.jpg",
    project_title: "Full Commercial HVAC System Installation for Apex Office Complex",
    logo_src:
      "madaga.png",
    description:
      "We installed a state-of-the-art HVAC system across the entire Apex Office Complex, improving airflow efficiency and energy savings.",
    features: [
      "Installed energy-efficient VRF system covering 50,000 sq ft.",
      "Integrated smart thermostats for zone-specific climate control.",
      "Reduced energy consumption by 25% within the first quarter.",
    ],
    case_study_link: "#",
    name: "Apex Office Complex",
    demo_images: [
       "/14.jpg",
      "/15.jpg",
      "/9.jpg",
      // "https://images.pexels.com/photos/159024/pexels-photo-159024.jpeg?auto=compress&cs=tinysrgb&w=1200",
      // "https://images.pexels.com/photos/129112/pexels-photo-129112.jpeg?auto=compress&cs=tinysrgb&w=1200",
      // "https://images.pexels.com/photos/276024/pexels-photo-276024.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    test_img: "/person.png",
    testimonial: `"The HVAC upgrade was seamless and our staff are now enjoying consistent comfort throughout the building."`,
    founder_name: "John Adams",
    position: "Facility Manager",
  },
  {
    main_image_src: "/three.jpg",
    project_title: "Industrial HVAC Maintenance and Ductwork Optimization",
    logo_src:
        "madaga.png",   
   description:
      "Performed comprehensive maintenance and ductwork optimization for a large industrial facility to enhance air quality and system efficiency.",
    features: [
      "Cleaned and replaced 12,000 sq ft of ductwork.",
      "Upgraded filtration systems for improved air quality.",
      "Reduced operational downtime by 40% through predictive maintenance.",
    ],
    case_study_link: "#",
    name: "Global Manufacturing Plant",
    demo_images: [
      "/13.jpg",
      "/11.jpg",
      "/12.jpg",
      // "https://images.pexels.com/photos/4195320/pexels-photo-4195320.jpeg?auto=compress&cs=tinysrgb&w=1200",
      // "https://images.pexels.com/photos/3836061/pexels-photo-3836061.jpeg?auto=compress&cs=tinysrgb&w=1200",
      // "https://images.pexels.com/photos/4182044/pexels-photo-4182044.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    test_img: "/person.png",
    testimonial: `"The team was professional, thorough, and extremely knowledgeable in optimizing our complex HVAC setup."`,
    founder_name: "Linda Thompson",
    position: "Operations Director",
  },
  {
    main_image_src: "one.jpg",
    project_title: "Residential HVAC System Upgrade with Smart Controls",
    logo_src: 
    "madaga.png",
    description:
      "Upgraded a residential HVAC system to a modern, energy‑efficient solution with smart thermostat integration for precise home comfort.",
    features: [
      "Installed high‑efficiency air conditioning and heating units.",
      "Integrated smart thermostats for room‑specific control via app.",
      "Enhanced air circulation and reduced monthly energy bills by 30%.",
    ],
    case_study_link: "#",
    name: "Greenwood Residences",
    demo_images: [
      "/10.jpg",
      "/11.jpg",
      "/12.jpg",
      // "https://images.pexels.com/photos/16848596/pexels-photo-16848596.jpeg?auto=compress&cs=tinysrgb&w=1200",
      // "https://images.pexels.com/photos/4108415/pexels-photo-4108415.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    test_img: "/person.png",
    testimonial: `"Our home has never been more comfortable. The installation was quick and the team explained everything clearly."`,
    founder_name: "Michael Brown",
    position: "Homeowner",
  },
  {
    main_image_src: "/four.jpg",
    project_title: "Hospital HVAC System Retrofit for Enhanced Safety",
    logo_src:
     "madaga.png",
    description:
      "Retrofitted the HVAC system at a busy hospital to meet modern air quality and safety standards, ensuring patient and staff safety.",
    features: [
      "Installed HEPA filtration units for critical zones.",
      "Upgraded airflow and ventilation to meet hospital compliance.",
      "Minimized system downtime during retrofit through phased installation.",
    ],
    case_study_link: "#",
    name: "City Hospital",
    demo_images: [
      // "https://images.pexels.com/photos/3845132/pexels-photo-3845132.jpeg?auto=compress&cs=tinysrgb&w=1200",
      // "https://images.pexels.com/photos/3845124/pexels-photo-3845124.jpeg?auto=compress&cs=tinysrgb&w=1200",
      // "https://images.pexels.com/photos/3845126/pexels-photo-3845126.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    test_img: "/person.png",
    testimonial: `"The retrofit was executed flawlessly. Air quality has greatly improved and our staff feels much safer."`,
    founder_name: "Dr. Emily Carter",
    position: "Hospital Administrator",
  },
  {
    main_image_src: "/three.jpg",
    project_title: "Retail Chain HVAC Optimization for Energy Efficiency",
    logo_src:
      "madaga.png",
    description:
      "Optimized HVAC systems across a retail chain to reduce energy costs and improve customer comfort.",
    features: [
      "Installed smart sensors to adjust temperatures based on foot traffic.",
      "Upgraded units to high-efficiency models.",
      "Achieved 20% reduction in energy costs across all locations.",
    ],
    case_study_link: "#",
    name: "Urban Retail Chain",
    demo_images: [
      // "https://images.pexels.com/photos/3734920/pexels-photo-3734920.jpeg?auto=compress&cs=tinysrgb&w=1200",
      // "https://images.pexels.com/photos/3734921/pexels-photo-3734921.jpeg?auto=compress&cs=tinysrgb&w=1200",
      // "https://images.pexels.com/photos/3734922/pexels-photo-3734922.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    test_img: "/person.png",
    testimonial: `"Our stores are now cooler in summer and warmer in winter, all while saving on energy bills."`,
    founder_name: "Karen Lee",
    position: "Regional Manager",
  },
];

export interface CaseStudyType {
  main_image_src: string;
  project_title: string;
  logo_src: string;
  description: string;
  features: string[];
  case_study_link: string;
  name: string;
  demo_images: string[];
  project_link?: string | null;
  cta_links?: {
    "let's talk": string;
    "read case study": string;
  };
  test_img?: string;
  testimonial?: string;
  founder_name?: string;
  position?: string;
}
