export interface EventProps {
  id: number;
  title: string;
  slug: string;
  location: string;
  date: string;
  image: string;
  shortDescription: string;
  longDescription: string;
  highlights: string[];
  whoAttends: string;
  eventProgramme: string;
  registerLink: string;
  price: number; // Add this line
}

export const events: EventProps[] = [
  {
    id: 1,
    title: "Global Summit on Higher Education",
    slug: "global-summit-on-higher-education",
    location: "Malta",
    date: "August 2–3, 2025",
    image: "/events/malta.png",
    shortDescription:
      "An executive-level summit focused on the strategic internationalization of higher education in a globalized world.",
    longDescription:
      "Hosted on the island of Malta, this summit invites higher education leaders to address pressing challenges in global engagement, accreditation, and student mobility. Through curated sessions and interactive meetings, attendees will develop actionable strategies to enhance cross-border partnerships, quality assurance systems, and institutional impact. The event fosters collaboration between universities, accreditation bodies, and government stakeholders.",
    highlights: [
      "Focused tracks on accreditation, student pathways, and transnational education",
      "Global networking with over 300+ senior education leaders",
      "Workshops on QA frameworks and bilateral partnership development",
    ],
    whoAttends:
      "Ideal for vice-chancellors, provosts, directors of international offices, government representatives, and heads of accreditation or QA agencies. This summit is tailored for decision-makers shaping the strategic direction of higher education institutions and networks.",
    eventProgramme:
      "The summit begins with a networking dinner and institutional showcase. The following day is structured around 1-on-1 appointments with international delegates (up to 24 per attendee), plus thematic roundtables and a keynote panel on the future of global academic partnerships.",
    registerLink: "/register",
    price: 300,
  },
  // Add price: 300 to all other events in the array...
  {
    id: 2,
    title: "International Conference on Educational Innovation",
    slug: "international-conference-on-educational-innovation",
    location: "Madrid, Spain",
    date: "August 9–10, 2025",
    image: "/events/madrid.png",
    shortDescription:
      "A global conference spotlighting transformative innovations in teaching, technology, and institutional learning strategies.",
    longDescription:
      "Held in the heart of Madrid, this international conference brings together forward-thinking educators, institutional leaders, and EdTech pioneers for two days of immersive discussion and knowledge exchange. Participants will engage with global experts on topics such as AI-driven learning environments, curriculum redesign, and digital equity. From keynote panels to networking receptions, this conference is a must-attend for those shaping the future of education.",
    highlights: [
      "Interactive sessions on AI, AR/VR, and blended learning",
      "Panel discussions on global education equity and accessibility",
      "Networking reception with leaders from 40+ countries",
    ],
    whoAttends:
      "This event welcomes school and university administrators, curriculum designers, EdTech startups, teacher trainers, and academic researchers. It is especially beneficial for institutions exploring innovative digital integration and future-ready academic models.",
    eventProgramme:
      "This 1.5-day event kicks off with an evening welcome reception, offering a relaxed environment to build connections with education professionals. Day two is focused on personalized 1-on-1 meetings (up to 24 per attendee), as well as breakout sessions and expert-led panels, providing valuable insight into modern education strategies.",
    registerLink: "/register",
    price: 300,
  },
  // Continue adding price: 300 to all remaining events...
  {
    id: 3,
    title: "European Forum on Global Education Policy",
    slug: "european-forum-on-global-education-policy",
    location: "Paris, France",
    date: "September 20–21, 2025",
    image: "/events/paris.jpg",
    shortDescription:
      "A high-level policy forum uniting ministries, NGOs, and institutional leaders to shape the global education agenda post-2030.",
    longDescription:
      "Taking place at UNESCO headquarters in Paris, this forum offers an exclusive platform for educational policymakers, government officials, and nonprofit leaders to convene and discuss sustainable education policy frameworks, funding models, and governance mechanisms. Featuring plenary sessions and curated dialogue tables, this event supports collaboration toward the 2030+ global education goals.",
    highlights: [
      "UNESCO-led sessions on education for sustainable development",
      "Collaborative policy design workshops",
      "Networking with international funding bodies and NGOs",
    ],
    whoAttends:
      "Open to senior government education officials, international development agencies, policy advisors, university rectors, and NGOs operating in education and youth development. The forum is ideal for those influencing or executing education policies at national and global levels.",
    eventProgramme:
      "The forum launches with an evening policy roundtable and networking reception. The second day includes up to 24 scheduled institutional meetings and high-level discussions on public-private partnerships, donor engagement, and scalable policy implementation strategies.",
    registerLink: "/register",
    price: 300,
  },
  {
    id: 4,
    title: "North American Summit on Digital Learning",
    slug: "north-american-summit-on-digital-learning",
    location: "Vancouver, Canada",
    date: "September 27–28, 2025",
    image: "/events/vancouver.png",
    shortDescription:
      "An in-depth summit exploring the evolution of digital learning across North America and its global implications.",
    longDescription:
      "Set against the scenic backdrop of Vancouver, this summit explores the intersection of technology, pedagogy, and policy in digital learning. From AI-enhanced adaptive platforms to microcredential ecosystems, sessions focus on scalable, inclusive solutions for 21st-century learners. Participants will engage in intensive strategy workshops, tech showcases, and cross-sector networking.",
    highlights: [
      "Case studies from leading EdTech deployments in Canada and the US",
      "Workshops on hybrid learning models and microcredentials",
      "Tech expo featuring the latest in learning platforms and tools",
    ],
    whoAttends:
      "Designed for EdTech developers, instructional designers, university CIOs, policy leaders, and digital transformation officers. This summit is best suited for those driving or adopting digital-first strategies in higher education and workforce learning.",
    eventProgramme:
      "Begins with a scenic networking cruise and keynote address. The following day includes expert panels, product demos, and 1-on-1 matchmaking with platform providers and institutional buyers.",
    registerLink: "/register",
    price: 300,
  },
  {
    id: 5,
    title: "London Symposium on Global Academic Mobility",
    slug: "london-symposium-on-global-academic-mobility",
    location: "London, UK",
    date: "October 3–4, 2025",
    image: "/events/london.png",
    shortDescription:
      "A symposium focused on the challenges and opportunities of international student mobility in a rapidly changing world.",
    longDescription:
      "Held in London, a hub of academic diversity, this symposium dives into evolving patterns of global student flows, visa and policy reforms, and institutional strategies for attracting and retaining international talent. Attendees will benefit from panel debates, mobility trend reports, and region-specific strategy roundtables.",
    highlights: [
      "Debates on visa policy shifts and global enrolment trends",
      "Interactive sessions on mobility marketing and student experience",
      "Opportunities for collaboration with global recruitment partners",
    ],
    whoAttends:
      "Targeted at international office heads, enrollment managers, mobility coordinators, policy experts, and government officials. Ideal for professionals managing or influencing international recruitment and student support systems.",
    eventProgramme:
      "Kicks off with a policy networking dinner followed by a day of focused breakout sessions, data-driven presentations, and curated partner meetings (up to 24 per attendee).",
    registerLink: "/register",
    price: 300,
  },
];

export function getEventBySlug(slug: string): EventProps | undefined {
  return events.find((event) => event.slug === slug);
}
