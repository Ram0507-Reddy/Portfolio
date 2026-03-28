export type ProjectCategory = 'Featured' | 'Cyber-security' | 'Web development';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory[];
  description: string;
  tags: string[];
  link: string; // The URL to the hosted project or Cyber Viewer
}

export const projects: Project[] = [
  // --- CYBERSECURITY PROJECTS ---
  {
    id: "cyber-1",
    title: "Adv. Password Strength Checker",
    category: ["Cyber-security"],
    description: "Evaluates password complexity using deep entropy analysis and pattern recognition.",
    tags: ["Python", "Cryptography", "Security"],
    link: "/cyber/1_Advanced_Password_Strength_Checker"
  },
  {
    id: "cyber-2",
    title: "NL Port Scanner",
    category: ["Cyber-security", "Featured"],
    description: "An AI-enhanced network and port scanner driven by natural language query inputs.",
    tags: ["Python", "Networking", "AI"],
    link: "/cyber/2_Natural_Language_Port_Scanner"
  },
  {
    id: "cyber-3",
    title: "File Integrity Monitor",
    category: ["Cyber-security"],
    description: "Cryptographically hashes and monitors critical system files for unauthorized mutations.",
    tags: ["Python", "SHA-256", "Systems"],
    link: "/cyber/3_File_Integrity_Monitor"
  },
  {
    id: "cyber-4",
    title: "Fortified Login System",
    category: ["Cyber-security"],
    description: "Secure authentication architecture preventing brute-force and dictionary attacks.",
    tags: ["Python", "Auth", "Rate-Limiting"],
    link: "/cyber/4_Fortified_Login_System"
  },
  {
    id: "cyber-5",
    title: "Web Vulnerability Scanner",
    category: ["Cyber-security", "Featured"],
    description: "Automated scanner targeting OWASP Top 10 vulnerabilities on active domains.",
    tags: ["Python", "OWASP", "XSS/SQLi"],
    link: "/cyber/5_Web_Vulnerability_Scanner"
  },
  {
    id: "cyber-6",
    title: "Encrypted Password Manager",
    category: ["Cyber-security"],
    description: "Locally encrypted fault-tolerant password vault using military-grade AES standards.",
    tags: ["Python", "AES-256", "Vault"],
    link: "/cyber/6_Encrypted_Password_Manager"
  },
  {
    id: "cyber-7",
    title: "Network Packet Analyzer",
    category: ["Cyber-security"],
    description: "Real-time packet sniffing and analysis tool for network troubleshooting.",
    tags: ["Python", "Scapy", "TCP/IP"],
    link: "/cyber/7_Network_Packet_Analyzer"
  },
  {
    id: "cyber-8",
    title: "Phishing Detection Tool",
    category: ["Cyber-security"],
    description: "Analyzes URL structures and metadata to detect malicious phishing domains.",
    tags: ["Python", "Heuristics", "OSINT"],
    link: "/cyber/8_Phishing_Detection_Tool"
  },
  {
    id: "cyber-9",
    title: "Local Intrusion Detection System",
    category: ["Cyber-security", "Featured"],
    description: "Monitors local traffic anomalies and unauthorized lateral movement attempts.",
    tags: ["Python", "IDS", "Telemetry"],
    link: "/cyber/9_Local_Intrusion_Detection_System"
  },
  {
    id: "cyber-10",
    title: "Secure Communication System",
    category: ["Cyber-security"],
    description: "Peer-to-peer encrypted messaging interface utilizing public-key infrastructure.",
    tags: ["Python", "RSA", "Sockets"],
    link: "/cyber/10_Secure_Communication_System"
  },

  // --- WEB DEVELOPMENT PROJECTS (SUCCESSFULLY BUILT STATIC BUNDLES) ---
  {
    id: "web-adv-1",
    title: "Enterprise Ecommerce Platform",
    category: ["Web development", "Featured"],
    description: "A high-performance modern storefront with advanced filtering and integrated payment flows.",
    tags: ["React", "Vite", "Node.js", "Stripe"],
    link: "/web_projects/1_Ecommerce_Platform/index.html"
  },
  
  // --- ADDED THE MISSING INTERMEDIATE/BEGINNER HTML TEMPLATES ---
  {
    id: "web-int-1",
    title: "Secure Auth Interface",
    category: ["Web development"],
    description: "Production-ready authentication UI with role-based access control and JWT flow.",
    tags: ["React", "JWT", "Security"],
    link: "/web_projects/1_Auth_System/index.html"
  },
  {
    id: "web-int-2",
    title: "Real-Time Chat App",
    category: ["Web development"],
    description: "Persistent messaging room with typing indicators and online status tracking.",
    tags: ["React", "Vite", "Chat"],
    link: "/web_projects/2_Chat_App/index.html"
  },
  {
    id: "web-int-3",
    title: "Encrypted File Upload Gateway",
    category: ["Web development", "Featured"],
    description: "Client-side encrypted file dropping zone with auto-expiry and secure retrieval.",
    tags: ["React", "Cryptography", "Storage"],
    link: "/web_projects/3_Secure_File_Upload/index.html"
  },

  {
    id: "web-beg-1",
    title: "Task Management App",
    category: ["Web development"],
    description: "A clean, drag-and-drop enabled state management interface for personal productivity.",
    tags: ["React", "State", "UI/UX"],
    link: "/web_projects/1_ToDo_App/index.html"
  },
  {
    id: "web-beg-2",
    title: "Global Weather App",
    category: ["Web development"],
    description: "Live atmospheric data visualization pulling from real-time meteorological APIs.",
    tags: ["React", "API", "DataViz"],
    link: "/web_projects/2_Weather_App/index.html"
  },
  {
    id: "web-beg-3",
    title: "Static Blog Generator",
    category: ["Web development"],
    description: "A minimalist, hyper-fast markdown blogging platform with SEO optimization.",
    tags: ["React", "Markdown", "Static"],
    link: "/web_projects/3_Blog_Website/index.html"
  }
];
