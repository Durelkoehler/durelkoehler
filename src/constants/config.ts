export const CANVAS_CONFIG = {
  totalFrames: 126,
  framePath: (index: number) =>
    `/sequence/frame_${index.toString().padStart(3, "0")}_delay-0.04s.webp`,
  dimensions: {
    width: 1920,
    height: 1080,
  },
};

export const SPRING_PRESETS = {
  magnetic: { type: "spring", stiffness: 120, damping: 15, mass: 0.8 },
  hover: { type: "spring", stiffness: 300, damping: 25 },
  card: { type: "spring", stiffness: 180, damping: 20 },
  scroll: { type: "spring", stiffness: 100, damping: 30, restDelta: 0.001 },
};

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  year: string;
  link: string;
  accent: string;
  image: string;
}

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "Bénin Excursion",
    description:
      "Complete redesign of a full-featured tourism platform, enabling users to browse and book guided excursions across Bénin while strengthening the agency's brand credibility.",
    category: "Website Development",
    year: "2026",
    link: "https://beninexcursion.com/",
    accent: "from-blue-600 to-indigo-600",
    image: "/b%C3%A9nin-excursion.png",
  },
  {
    id: "02",
    title: "Resofindev — Resource Mobilization Platform",
    description:
      "Web platform connecting project owners with financial partners, helping businesses mobilize the resources needed to bring their initiatives to life.",
    category: "Website Development",
    year: "2025",
    link: "https://resofindev.org/",
    accent: "from-purple-600 to-pink-600",
    image: "/resofindev.png",
  },
  {
    id: "03",
    title: "Clioclic — Digital Marketing & Lead Generation Agency",
    description:
      "Design and development of a modern, custom showcase website for an agency specialized in client acquisition and CRM automation. The website highlights the agency's strategic services through a clean architecture, conversion-focused design, and an optimized user journey.",
    category: "Website Development",
    year: "2025",
    link: "https://clioclic.com",
    accent: "from-amber-500 to-orange-600",
    image: "/clioclic.png",
  },
  {
    id: "04",
    title: "Experience Benin — Tourism Promotion & Excursion Platform",
    description:
      "Design and development of an immersive website showcasing authentic tourism and cultural heritage in Benin (Ganvié, Ouidah, Grand-Popo). The site combines strong visual storytelling with a sleek layout and an intuitive navigation system designed to drive excursion bookings.",
    category: "Website Development",
    year: "2024",
    link: "https://experiencebénin.com",
    accent: "from-emerald-500 to-teal-600",
    image: "/experience benin.png",
  },
];

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  details: string[];
}

export const EXPERIENCES: Experience[] = [
  {
    id: "01",
    role: "Graphic Designer & Community Manager",
    company: "OmeliGod",
    period: "2023 – 2024",
    details: [
      "Spearheaded visual content creation and brand strategy for Iviision (kitchen appliance & blender line), boosting brand visibility and product engagement.",
      "Designed multi-channel graphic assets and managed social media strategy to drive audience engagement and brand awareness.",
    ],
  },
  {
    id: "02",
    role: "Web Designer, WordPress Developer & Graphic Designer",
    company: "Sourou Prod",
    period: "2025 - 2026",
    details: [
      "Designed, developed, and revamped custom WordPress websites, focusing on performance, UX/UI, and tailored responsive layouts.",
      "Produced high-impact visual assets and marketing materials for international organizations and local institutions (CECI Bénin, CDEL, among others).",
      "Collaborated closely with production teams to maintain brand consistency across both digital platforms and graphic collateral."
    ],
  },

   {
    id: "03",
    role: "Co-Founder & Lead Digital Designer",
    company: "Brhocom",
    period: "Present",
    details: [
      "Co-founded Brhocom, delivering strategic digital design, WordPress development, and branding solutions to private clients and agencies.",
      "Provide end-to-end consulting for custom web projects, brand identity development, and visual communication assets.",
      "Collaborated closely with production teams to maintain brand consistency across both digital platforms and graphic collateral."
    ],
  },
];

export const SOCIALS = [
  { name: "Facebook", link: "https://facebook.com" },
  { name: "Tiktok", link: "https://tiktok.com" },
  { name: "LinkedIn", link: "https://linkedin.com" },
  { name: "GitHub", link: "https://github.com" },
];
