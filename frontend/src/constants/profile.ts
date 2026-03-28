export interface Education {
  degree: string;
  institution: string;
  period: string;
  status?: string;
}

export interface Experience {
  role: string;
  org: string;
  duration: string;
  focus?: string;
  location?: string;
  website?: string;
  mapLink?: string;
}

export interface Skills {
  programming: string[];
  systems: string[];
  tools: string[];
  domains: string[];
}

export interface Profile {
  name: string;
  dob: string;
  location: string;
  languages: string[];
  education: Education[];
  experience: Experience[];
  skills: Skills;
  achievements: { title: string; detail: string }[];
  certifications: string[];
  contact: {
    phone: string;
    email: string;
    github: string;
    linkedin?: string;
    instagram?: string;
    whatsapp?: string;
  };
  strengths: string[];
  traits: string[];
}

export const profile: Profile = {
  name: "Shriram Reddy",
  dob: "5 July 2007",
  location: "Open to Work",
  languages: ["English", "Hindi", "Marathi", "Telugu"],
  education: [
    {
      degree: "B.Tech in Computer Science Engineering (Cybersecurity)",
      institution: "Parul University",
      period: "2024 - Present",
      status: "Current (CGPA: 8.5)",
    },
    {
      degree: "BS Degree in Data Science & Applications",
      institution: "Indian Institute of Technology Madras",
      period: "2024 - Present",
      status: "Current (CGPA: 8.2)",
    },
    {
      degree: "Class 12th",
      institution: "Brio E-tech Junior College, Mumbai",
      period: "2022 - 2024",
      status: "68%",
    },
    {
      degree: "Class 10th",
      institution: "St. Rock's High School, Mumbai",
      period: "2012 - 2022",
      status: "88%",
    },
  ],
  experience: [
    {
      role: "Assistant Teacher",
      org: "Parul Institute",
      duration: "2023–2024",
      location: "Mumbai",
      mapLink: "https://maps.app.goo.gl/Qm1Z6DDSRPz9sDnp6",
    },
    {
      role: "Founder",
      org: "Zero Labs",
      duration: "2023 - Present",
      focus: "Privacy-oriented software systems",
      website: "zero-s.tech",
    },
  ],
  skills: {
    programming: ["HTML", "CSS", "JavaScript", "C", "C++", "Python", "Bash"],
    systems: ["MERN stack", "Docker", "Ollama", "Local AI setups"],
    tools: ["Figma", "Canva", "CapCut"],
    domains: ["Cybersecurity", "Ethical hacking", "Privacy-first system design"],
  },
  achievements: [
    { title: "Smart India Hackathon (SIH) 2025", detail: "Rank 64" },
    { title: "NHAI Hackathon", detail: "Participant/Finalist" },
    { title: "AMD Hackathon 2026", detail: "Participant/Finalist" },
  ],
  certifications: [
    "Microsoft AI Vibe Coding",
    "Pearson HTML/CSS",
    "ADK Builder’s Badge",
    "Gemini at Work",
    "Advanced Prompt Engineering – OpenAI",
  ],
  contact: {
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
    github: "https://github.com/Ram0507-Reddy",
    linkedin: "https://www.linkedin.com/in/shriram-reddy/",
    instagram: "https://www.instagram.com/_the_exxplorer05/",
  },
  strengths: [
    "Builds privacy-first systems",
    "Full-stack + OS-level + AI integration",
    "Startup thinking + technical execution",
    "Real-world problem solving",
  ],
  traits: ["Night owl", "Self-driven learner", "Logic + Impact oriented"],
};
