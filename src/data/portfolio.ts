export type ProjectCategory = 'all' | 'fullstack' | 'ai' | 'hardware';

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: string;
  description: string;
  highlights: string[];
  technologies: string[];
  artworkId: 'restaurant' | 'resume' | 'arduino' | 'interview' | 'portfolio';
  /** Replace with your real image path (e.g. '/images/project.jpg') when ready */
  imageUrl?: string;
  /** Replace '#' with your real GitHub repository URL */
  githubUrl: string;
  /** Replace with your real live demo URL when deployed */
  liveUrl?: string;
  featuredInHero?: boolean;
  heroTiltDeg?: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  iconName: 'code' | 'layout' | 'server' | 'database' | 'wrench' | 'cpu';
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  department?: string;
  organizationMonogram: string;
  logoUrl?: string;
  duration: string;
  location: string;
  responsibilities: string[];
  skillsGained: string[];
  contributions: string[];
  isEditablePlaceholder?: boolean;
}

export interface AchievementItem {
  id: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  /** Replace with actual certificate scan path when available */
  certificateImageUrl?: string;
  issuingNote: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  university: string;
  academicYear: string;
  specialization: string;
  coursework: string[];
  isEditablePlaceholder?: boolean;
}

export const portfolioData = {
  owner: {
    monogram: 'RR.',
    fullName: 'Rishi Rajput',
    brandLabel: 'PERSONAL PORTFOLIO',
    year: '2026',
    role: 'Computer Science / Software Development',
    location: 'India',
    /** Owner-configurable availability status */
    availability: {
      enabled: true,
      label: 'Available for Software & Backend Roles',
    },
    /** Replace with Rishi Rajput's portrait photo URL (e.g. '/images/rishi-rajput.jpg') */
    profileImageUrl: '',
    headlineTop: 'Building Digital',
    headlineBottom: 'Experiences.',
    subHeadline: 'Engineering The Future.',
    heroIntro:
      "Hello, I'm Rishi Rajput — a Computer Science professional passionate about software development, backend engineering, artificial intelligence, and building innovative digital solutions.",
    footerTagline: 'Designed with creativity. Built with technology.',
  },

  contact: {
    email: 'rishirajput261@gmail.com',
    /** Replace placeholder social links with your exact profile URLs */
    linkedinUrl: 'https://www.linkedin.com/in/rishi-rajput-placeholder',
    githubUrl: 'https://github.com/rishi-rajput-placeholder',
    secondaryPlatformLabel: 'Portfolio / Coding Profiles',
    secondaryPlatformNote: 'Add LeetCode, HackerRank, or GeeksforGeeks URL in src/data/portfolio.ts',
    isSocialPlaceholder: true,
  },

  about: {
    title: 'Beyond The Code.',
    paragraphs: [
      'I am Rishi Rajput, a Computer Science student and aspiring software developer interested in building practical, scalable, and user-focused technology solutions.',
      'My interests include backend development, full-stack web development, Python programming, artificial intelligence, and modern software engineering.',
      'Alongside my technical journey, I have developed leadership, discipline, communication, and problem-solving skills through academic projects, internships, competitive examinations, and extracurricular activities.',
      'I believe in continuous learning, practical implementation, and using technology to solve real-world problems.',
    ],
    cards: [
      {
        id: 'education',
        title: 'Education',
        summary:
          'Pursuing Computer Science & Engineering fundamentals with focus on systems, data structures, and software design.',
        meta: 'Degree, Institution & Graduation Year — Editable in portfolio config',
      },
      {
        id: 'interests',
        title: 'Professional Interests',
        summary:
          'Backend architecture, RESTful APIs, full-stack web engineering, Python automation, and applied Artificial Intelligence.',
        meta: 'Backend · Full-Stack · Applied AI',
      },
      {
        id: 'philosophy',
        title: 'Development Philosophy',
        summary:
          'Write maintainable code, prioritize clean data flow and reliability, and ship practical software grounded in real user needs.',
        meta: 'Clarity · Scalability · Craft',
      },
      {
        id: 'goals',
        title: 'Career Goals',
        summary:
          'Contribute to high-impact software engineering and backend teams building resilient products, intelligent tools, and modern platforms.',
        meta: 'SDE · Backend · Full-Stack Roles',
      },
    ],
  },

  projects: [
    {
      id: 'online-restaurant-food-app',
      index: '01',
      title: 'Online Restaurant Food Application',
      category: 'fullstack',
      categoryLabel: 'Full-Stack Web',
      description:
        'A web-based restaurant food ordering application focused on providing users with a convenient digital food ordering experience.',
      highlights: [
        'Digital menu browsing and responsive ordering flow designed for clarity across desktop and mobile devices.',
        'Structured backend request handling paired with persistent database storage for menu items and customer orders.',
        'Clean separation between user-facing frontend views, server logic, and database operations.',
      ],
      technologies: [
        'HTML',
        'CSS',
        'JavaScript',
        'Backend Technologies',
        'Database Technologies',
      ],
      artworkId: 'restaurant',
      githubUrl: '',
      liveUrl: '',
      featuredInHero: true,
      heroTiltDeg: -6,
    },
    {
      id: 'ai-resume-builder',
      index: '02',
      title: 'AI Resume Builder',
      category: 'ai',
      categoryLabel: 'MERN & AI',
      description:
        'An AI-powered resume-building platform designed to assist users in creating professional resumes.',
      highlights: [
        'Full-stack MERN architecture enabling structured user profile input and real-time resume preview formatting.',
        'AI integration to help refine bullet points, structure career summaries, and streamline professional document creation.',
        'Modular component design for multi-section editing and clean export workflows.',
      ],
      technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'AI Integration'],
      artworkId: 'resume',
      githubUrl: '',
      liveUrl: '',
      featuredInHero: true,
      heroTiltDeg: -2.5,
    },
    {
      id: 'hc05-arduino-car',
      index: '03',
      title: 'HC-05 Controlled Arduino Car',
      category: 'hardware',
      categoryLabel: 'Embedded Systems',
      description:
        'An Arduino-based Bluetooth-controlled car developed using an HC-05 Bluetooth module.',
      highlights: [
        'Wireless serial command communication established between a controller device and Arduino via the HC-05 Bluetooth transceiver.',
        'Motor driver integration translating directional commands into real-time chassis movement.',
        'Hands-on circuit assembly, power management, and embedded microcontroller programming.',
      ],
      technologies: ['Arduino', 'HC-05', 'Embedded Systems', 'Electronics'],
      artworkId: 'arduino',
      githubUrl: '',
      liveUrl: '',
      featuredInHero: true,
      heroTiltDeg: 3,
    },
    {
      id: 'ai-mock-interview',
      index: '04',
      title: 'AI Mock Interview Preparation Platform',
      category: 'ai',
      categoryLabel: 'AI Platform Concept',
      description:
        'An AI-based platform concept designed to support interview preparation through interactive mock interview experiences.',
      highlights: [
        'Interactive question-and-response preparation workflow tailored to technical and behavioral readiness.',
        'Structured feedback concept aimed at helping candidates practice clarity, pacing, and domain depth.',
        'Designed around scalable backend orchestration and clean dark-mode focus ergonomics.',
      ],
      technologies: ['Artificial Intelligence', 'Python / Node.js', 'REST APIs', 'Web UI'],
      artworkId: 'interview',
      githubUrl: '',
      liveUrl: '',
      featuredInHero: false,
    },
    {
      id: 'personal-portfolio',
      index: '05',
      title: 'Personal Portfolio Website',
      category: 'fullstack',
      categoryLabel: 'Editorial Web',
      description:
        'A responsive personal branding website showcasing technical expertise, professional experience, projects, and achievements.',
      highlights: [
        'Dark editorial visual direction featuring architectural grid lines, custom artwork, and kinetic motion.',
        'Full-stack Express contact inquiry endpoint with validation and optional email/webhook delivery.',
        'Centralized TypeScript data layer for instant updates to projects, availability, and credentials.',
      ],
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Express'],
      artworkId: 'portfolio',
      githubUrl: '',
      liveUrl: '',
      featuredInHero: true,
      heroTiltDeg: 5.5,
    },
  ] as ProjectItem[],

  skillCategories: [
    {
      id: 'languages',
      title: 'Programming Languages',
      iconName: 'code',
      skills: ['Python', 'JavaScript', 'C', 'C++'],
    },
    {
      id: 'frontend',
      title: 'Frontend Development',
      iconName: 'layout',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Responsive Web Design'],
    },
    {
      id: 'backend',
      title: 'Backend Development',
      iconName: 'server',
      skills: ['Backend Development', 'REST API Development', 'Node.js', 'Express.js'],
    },
    {
      id: 'database',
      title: 'Database',
      iconName: 'database',
      skills: ['MySQL', 'MongoDB'],
    },
    {
      id: 'tools',
      title: 'Tools & Platforms',
      iconName: 'wrench',
      skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'Overleaf'],
    },
    {
      id: 'ai',
      title: 'AI & Technology',
      iconName: 'cpu',
      skills: [
        'Artificial Intelligence',
        'Machine Learning Fundamentals',
        'Python-based AI Applications',
      ],
    },
  ] as SkillCategory[],

  experience: [
    {
      id: 'sail-gat',
      role: 'Graduate Apprentice Trainee',
      organization: 'Steel Authority of India Limited (SAIL)',
      department: 'Central Marketing Organization',
      organizationMonogram: 'SAIL',
      duration: 'Editable Duration (e.g., Month Year – Month Year)',
      location: 'India · Central Marketing Organization',
      responsibilities: [
        '[Editable] Add verified day-to-day operational, technical, or systems support responsibilities at CMO, SAIL.',
        '[Editable] Document workflow coordination, data handling, or IT/enterprise processes observed during apprenticeship.',
      ],
      skillsGained: ['Enterprise Workflows', 'Professional Communication', 'Technical Documentation'],
      contributions: [
        '[Editable] Add specific verified contributions or project deliverables completed during the apprenticeship.',
      ],
      isEditablePlaceholder: true,
    },
    {
      id: 'shadowfox-backend',
      role: 'Backend Developer Intern',
      organization: 'ShadowFox',
      organizationMonogram: 'SF',
      duration: 'August 2026 – August 2026',
      location: 'Remote / India',
      responsibilities: [
        '[Editable] Add verified backend API endpoints, server-side logic, and database integration tasks.',
        '[Editable] Document testing with Postman, Git collaboration, and code review workflows.',
      ],
      skillsGained: ['Node.js', 'Express.js', 'REST API Development', 'Database Integration', 'Git'],
      contributions: [
        '[Editable] Add specific verified backend features or internship deliverables completed at ShadowFox.',
      ],
      isEditablePlaceholder: true,
    },
  ] as ExperienceItem[],

  achievements: [
    {
      id: 'national-science-fair-2025',
      title: 'National Science Fair 2025 Winner',
      category: 'National Innovation Award',
      year: '2025',
      summary:
        'Recognized as Winner at the National Science Fair 2025 for applied technical innovation and project execution.',
      issuingNote: 'Certificate image & verified event details editable in src/data/portfolio.ts',
    },
    {
      id: 'ncc-army-attachment-2025',
      title: 'Overall Excellence Award – NCC Army Attachment Camp 2025',
      category: 'Leadership & Discipline',
      year: '2025',
      summary:
        'Awarded Overall Excellence at the NCC Army Attachment Camp 2025, reflecting discipline, team leadership, and resilience.',
      issuingNote: 'Certificate image & camp unit details editable in src/data/portfolio.ts',
    },
    {
      id: 'ncc-c-certificate',
      title: 'NCC C Certificate Achievement',
      category: 'National Cadet Corps',
      year: 'Certified',
      summary:
        'Earned the NCC C Certificate, demonstrating sustained commitment, leadership training, and civic discipline.',
      issuingNote: 'Certificate preview slot ready for verified document upload',
    },
    {
      id: 'competitive-exams',
      title: 'Competitive Examination Achievements',
      category: 'Academic Merit',
      year: 'Ongoing',
      summary:
        'Demonstrated analytical rigor and quantitative problem-solving through competitive academic and technical examinations.',
      issuingNote: 'Add specific examination names or ranks in src/data/portfolio.ts',
    },
    {
      id: 'technical-internship-certs',
      title: 'Technical Internship Certificates',
      category: 'Industry Credentials',
      year: '2026',
      summary:
        'Verified technical internship completion credentials covering backend software development and enterprise exposure.',
      issuingNote: 'Upload or link ShadowFox / SAIL certificate scans in src/data/portfolio.ts',
    },
    {
      id: 'academic-professional-recognitions',
      title: 'Academic and Professional Recognitions',
      category: 'Institutional Honors',
      year: '2024 – 2026',
      summary:
        'Commendations across technical project exhibitions, academic milestones, and collaborative leadership initiatives.',
      issuingNote: 'Editable section for additional awards, hackathons, or honors',
    },
  ] as AchievementItem[],

  education: [
    {
      id: 'primary-degree',
      degree: '[Editable] Bachelor of Technology / Bachelor of Engineering in Computer Science',
      institution: '[Editable] Institution / College Name',
      university: '[Editable] Affiliating University Name',
      academicYear: '[Editable] Academic Year (e.g., 2022 – 2026)',
      specialization: 'Computer Science & Software Engineering',
      coursework: [
        'Data Structures & Algorithms',
        'Database Management Systems (MySQL / MongoDB)',
        'Operating Systems',
        'Computer Networks',
        'Object-Oriented Programming (C++ / Python)',
        'Web & Backend Engineering',
      ],
      isEditablePlaceholder: true,
    },
  ] as EducationItem[],
};
