export interface CourseModule {
  title: string;
  description: string;
  duration: string;
  topics: string[];
}

export interface Course {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string[];
  image: string;
  duration: string;
  price: number;
  discountPrice?: number;
  features: string[];
  learningOutcomes: string[];
  modules: CourseModule[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const courses: Course[] = [
  {
    id: 1,
    slug: "introduction-to-international-education",
    title: "Introduction to International Education",
    subtitle:
      "Understand the fundamentals of global education systems and mobility",
    description:
      "A comprehensive introduction to international education, covering key concepts, trends, and practices in student mobility across borders.",
    longDescription: [
      "This course provides a thorough introduction to the field of international education, exploring the dynamics of student mobility across borders and the various factors that influence educational choices globally.",
      "You'll gain insights into different education systems worldwide, understand market trends, and learn about the key stakeholders in international education including institutions, students, parents, and agents.",
      "Whether you're new to the field or looking to formalize your knowledge, this course offers a structured approach to understanding the fundamentals of international education and provides a solid foundation for further specialization.",
    ],
    image: "/courses/course1.jpg",
    duration: "6 weeks",
    price: 299,
    discountPrice: 249,
    features: [
      "6 comprehensive modules",
      "24 video lessons",
      "Downloadable resources",
      "Self-paced learning",
      "Certificate of completion",
      "Expert instructor support",
    ],
    learningOutcomes: [
      "Understand the global landscape of international education",
      "Identify key stakeholders and their roles in student mobility",
      "Analyze trends and factors affecting student decision-making",
      "Compare different education systems and their unique features",
      "Recognize the impact of policy changes on international education",
      "Develop strategies for effective communication across cultures",
    ],
    modules: [
      {
        title: "Module 1: Foundations of International Education",
        description:
          "An overview of international education history, development, and current landscape",
        duration: "1 week",
        topics: [
          "Historical development of international education",
          "Key terminology and concepts",
          "Global education systems overview",
          "Major destination countries and their appeal",
        ],
      },
      {
        title: "Module 2: Student Mobility Trends",
        description:
          "Understanding patterns and factors influencing student mobility worldwide",
        duration: "1 week",
        topics: [
          "Current global mobility statistics",
          "Push and pull factors in student decision-making",
          "Regional trends and emerging markets",
          "Impact of global events on mobility patterns",
        ],
      },
      {
        title: "Module 3: Stakeholders in International Education",
        description:
          "Exploring the roles and relationships of key players in the sector",
        duration: "1 week",
        topics: [
          "Educational institutions and their internationalization strategies",
          "Government policies and regulatory frameworks",
          "Education agents and their role in student recruitment",
          "Support services and student experience providers",
        ],
      },
      {
        title: "Module 4: Cultural Considerations",
        description:
          "Navigating cultural differences in international education contexts",
        duration: "1 week",
        topics: [
          "Cross-cultural communication principles",
          "Cultural adaptation and integration challenges",
          "Supporting international students through cultural transition",
          "Developing cultural intelligence for education professionals",
        ],
      },
      {
        title: "Module 5: Quality Assurance and Ethics",
        description:
          "Maintaining standards and ethical practices in international education",
        duration: "1 week",
        topics: [
          "Quality assurance frameworks and accreditation",
          "Ethical recruitment practices",
          "Student welfare and duty of care",
          "Managing expectations and providing accurate information",
        ],
      },
      {
        title: "Module 6: Future Trends and Innovation",
        description:
          "Examining emerging developments and their potential impact",
        duration: "1 week",
        topics: [
          "Technology and digital transformation in education",
          "Transnational education models",
          "Sustainability in international education",
          "Preparing for future challenges and opportunities",
        ],
      },
    ],
    faqs: [
      {
        question: "Who is this course designed for?",
        answer:
          "This course is ideal for professionals new to international education, including university staff, education agents, government officials, and anyone interested in understanding global student mobility.",
      },
      {
        question: "Do I need any prior knowledge to take this course?",
        answer:
          "No prior knowledge is required. The course is designed to provide a comprehensive introduction to the field, making it accessible for beginners while still valuable for those with some experience.",
      },
      {
        question: "How much time should I allocate per week for this course?",
        answer:
          "We recommend allocating 4-6 hours per week to complete the course materials, activities, and assessments.",
      },
      {
        question: "Will I receive a certificate upon completion?",
        answer:
          "Yes, upon successful completion of all modules and assessments, you will receive a digital certificate that you can add to your professional profile.",
      },
      {
        question: "Is there any deadline to complete the course?",
        answer:
          "The course is self-paced, so you can complete it at your own speed. However, we recommend finishing within 3 months of starting to maintain momentum and engagement with the material.",
      },
    ],
  },
  {
    id: 2,
    slug: "working-with-education-agents",
    title: "Working with Education Agents",
    subtitle:
      "Build effective partnerships with agents for successful student recruitment",
    description:
      "Learn how to establish, manage, and optimize relationships with education agents to enhance your institution's international recruitment strategy.",
    longDescription: [
      "This specialized course focuses on the critical relationship between educational institutions and education agents, providing a comprehensive framework for establishing and maintaining productive partnerships.",
      "You'll learn proven strategies for agent selection, training, management, and performance evaluation, while gaining insights into legal and ethical considerations that govern these relationships.",
      "Designed for recruitment professionals, this course combines theoretical knowledge with practical tools that you can immediately implement to improve your agent network and recruitment outcomes.",
    ],
    image: "/courses/course2.jpg",
    duration: "8 weeks",
    price: 399,
    discountPrice: 349,
    features: [
      "8 in-depth modules",
      "32 video lessons",
      "Practical templates and tools",
      "Case studies and best practices",
      "Interactive assignments",
      "Personalized feedback",
    ],
    learningOutcomes: [
      "Develop a strategic approach to agent selection and recruitment",
      "Create effective agent agreements and commission structures",
      "Design and deliver engaging agent training programs",
      "Implement systems for monitoring agent performance and compliance",
      "Resolve common challenges in agent relationships",
      "Optimize your agent network for sustainable recruitment results",
    ],
    modules: [
      {
        title: "Module 1: Understanding the Agent Landscape",
        description:
          "Exploring the role and importance of education agents in international recruitment",
        duration: "1 week",
        topics: [
          "The evolution of education agents in international recruitment",
          "Types of education agents and business models",
          "Regional variations in agent practices",
          "Current trends and statistics in agent-based recruitment",
        ],
      },
      {
        title: "Module 2: Strategic Agent Selection",
        description:
          "Developing a framework for identifying and evaluating potential agent partners",
        duration: "1 week",
        topics: [
          "Creating an agent recruitment strategy",
          "Due diligence and background checks",
          "Evaluation criteria for potential agents",
          "Risk assessment and mitigation",
        ],
      },
      {
        title: "Module 3: Contracting and Legal Considerations",
        description:
          "Establishing clear agreements and understanding regulatory requirements",
        duration: "1 week",
        topics: [
          "Key components of effective agent agreements",
          "Commission structures and payment models",
          "Regulatory compliance across different jurisdictions",
          "Intellectual property and brand protection",
        ],
      },
      {
        title: "Module 4: Agent Training and Support",
        description:
          "Building agent knowledge and capacity to represent your institution effectively",
        duration: "1 week",
        topics: [
          "Designing comprehensive training programs",
          "Creating compelling marketing materials for agents",
          "Digital tools for agent support",
          "Building agent loyalty and engagement",
        ],
      },
      {
        title: "Module 5: Performance Management",
        description: "Monitoring and optimizing agent activities and outcomes",
        duration: "1 week",
        topics: [
          "Setting realistic targets and KPIs",
          "Data collection and analysis for agent performance",
          "Providing constructive feedback",
          "Incentive programs and recognition",
        ],
      },
      {
        title: "Module 6: Quality Assurance and Compliance",
        description: "Ensuring ethical practices and maintaining standards",
        duration: "1 week",
        topics: [
          "Ethical recruitment principles",
          "Monitoring for compliance with agreements",
          "Managing student expectations",
          "Handling misrepresentation issues",
        ],
      },
      {
        title: "Module 7: Relationship Management",
        description: "Nurturing long-term, productive partnerships with agents",
        duration: "1 week",
        topics: [
          "Communication strategies for agent relationships",
          "Cultural considerations in agent management",
          "Conflict resolution and problem-solving",
          "Building trust and transparency",
        ],
      },
      {
        title: "Module 8: Optimizing Your Agent Network",
        description:
          "Strategic approaches to growing and refining your agent partnerships",
        duration: "1 week",
        topics: [
          "Portfolio analysis and strategic planning",
          "Expanding into new markets with agents",
          "Consolidating and focusing agent relationships",
          "Measuring ROI and strategic value of agent networks",
        ],
      },
    ],
    faqs: [
      {
        question:
          "Is this course suitable for beginners in international recruitment?",
        answer:
          "While some basic understanding of international education is helpful, the course is designed to be accessible to those new to working with agents. That said, professionals with experience will also benefit from the strategic frameworks and best practices covered.",
      },
      {
        question: "Does this course cover legal aspects of agent agreements?",
        answer:
          "Yes, the course includes guidance on creating agent agreements and understanding legal considerations. However, it's not a substitute for legal advice specific to your institution and jurisdiction.",
      },
      {
        question: "Will I learn how to evaluate agent performance?",
        answer:
          "Absolutely. The course includes comprehensive coverage of setting KPIs, tracking performance, and implementing improvement strategies for your agent network.",
      },
      {
        question:
          "Does the course address online recruitment and virtual engagement with agents?",
        answer:
          "Yes, the course covers digital tools and strategies for agent management, including remote training, virtual familiarization tours, and online support systems.",
      },
      {
        question:
          "How practical is this course? Will I get templates and tools I can use?",
        answer:
          "The course is highly practical, providing templates for agent agreements, evaluation forms, training materials, and performance tracking tools that you can adapt for your institution.",
      },
    ],
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}

export function getAllCourses(): Course[] {
  return courses;
}

export function getAllCourseSlugs(): string[] {
  return courses.map((course) => course.slug);
}
