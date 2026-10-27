export type ProjectVisual = 'music' | 'records' | 'community' | 'systems';

export type ProjectPermissionStatus = 'public' | 'client-confidential-summary';

export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  tag: 'Mobile' | 'Web' | 'Music' | 'Systems';
  summary: string;
  role: string;
  period: string;
  stack: readonly string[];
  featured: boolean;
  visual: ProjectVisual;
  problem: string;
  approach: string;
  architecture: readonly string[];
  highlights: readonly string[];
  outcomeOrLearning: string;
  permissionStatus: ProjectPermissionStatus;
  repoUrl?: string;
  liveUrl?: string;
  relatedSlugs: readonly string[];
};

export const projects: readonly Project[] = [
  {
    slug: 'key-detective',
    number: '01',
    title: 'Key Detective',
    category: 'Music / Mobile',
    tag: 'Music',
    summary: 'A real-time pitch-detection mobile app tailored for acoustic environments and live worship musicians.',
    role: 'Mobile Developer & Creator',
    period: 'Personal Project',
    stack: ['Ionic', 'Angular', 'Pitchy', 'Web Audio API', 'TypeScript'],
    featured: true,
    visual: 'music',
    problem:
      'Musicians playing in live church acoustic settings frequently need fast, accurate pitch recognition and musical key detection without bulky hardware or disruptive manual tuning.',
    approach:
      'Engineered a cross-platform mobile application utilizing device microphone input and the Pitchy autocorrelation algorithm, formatted into an accessible high-contrast interface designed for stage use.',
    architecture: [
      'Audio Pipeline: Captures live microphone input via standard Web Audio API AudioContext with optimized sample buffers.',
      'Signal Processing: Leverages Pitchy autocorrelation to reliably extract fundamental pitch frequencies amidst reverberant acoustics.',
      'Reactive State: Angular RxJS streams process frequency events and publish immediate key estimations to the user interface.',
    ],
    highlights: [
      'Real-time frequency recognition with low audio buffer latency',
      'High-contrast stage view built for dim lighting conditions',
      'Clean pitch estimation designed specifically for acoustic guitar and keyboard players',
    ],
    outcomeOrLearning:
      'Gained deep practical insight into web and mobile audio streams, autocorrelation mathematics, and building distraction-free interfaces under live performance constraints.',
    permissionStatus: 'public',
    relatedSlugs: ['agentry', 'youth-ministry'],
  },
  {
    slug: 'agentry',
    number: '02',
    title: 'Agentry',
    category: 'Records / Mobile',
    tag: 'Mobile',
    summary: 'An offline-first mobile record-keeping system for agency field operations and client directories.',
    role: 'Mobile Developer',
    period: 'Personal Project',
    stack: ['Flutter', 'Firebase', 'SQLite', 'Dart'],
    featured: true,
    visual: 'records',
    problem:
      'Field agents regularly visit remote sites where cellular data is intermittent or absent, making cloud-only CRM tools unusable and risking critical record loss.',
    approach:
      'Designed an offline-first architecture utilizing SQLite for instant local read and write operations, paired with Firebase for cloud backups and synchronization upon network reconnection.',
    architecture: [
      'Local Storage: High-performance SQLite database schema caching full agency and client records locally on the device.',
      'Sync Engine: Event-driven synchronization pipeline detecting dirty records and uploading changes to Firebase when online.',
      'UI Layer: Cross-platform Flutter interface with reactive state management ensuring instantaneous user feedback.',
    ],
    highlights: [
      'Zero data loss during field visits with low or no connectivity',
      'Automatic background synchronization upon network reconnection',
      'Fast indexed search across local client directories',
    ],
    outcomeOrLearning:
      'Mastered offline-first database synchronization strategies, conflict resolution tradeoffs, and cross-platform mobile state management.',
    permissionStatus: 'public',
    relatedSlugs: ['key-detective', 'singha-pos'],
  },
  {
    slug: 'youth-ministry',
    number: '03',
    title: 'Youth Ministry',
    category: 'Community / Web',
    tag: 'Web',
    summary: 'A fast, accessible digital hub for the Apostolic Church National Youth Ministry community.',
    role: 'Web Developer',
    period: 'Community Project',
    stack: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    featured: true,
    visual: 'community',
    problem:
      'The national youth fellowship required a centralized, clean digital touchpoint for event updates, resources, and announcements that loaded swiftly on all devices and network tiers.',
    approach:
      'Developed a lightweight, highly accessible web presence using semantic HTML5, custom responsive CSS without heavy framework overhead, and progressive enhancement for interactive components.',
    architecture: [
      'Semantic Structure: Accessible document hierarchy with strict keyboard navigation and high-contrast color standards.',
      'Zero-Bloat Styling: Bespoke CSS grid and flexbox layouts achieving sub-second load times on low-bandwidth connections.',
      'Progressive Enhancement: Native accessible interactions functioning smoothly across diverse mobile and desktop browsers.',
    ],
    highlights: [
      'Sub-second first contentful paint across low-bandwidth connections',
      '100% accessible navigation compliant with WCAG standards',
      'Zero third-party runtime dependencies for maximum reliability',
    ],
    outcomeOrLearning:
      'Reinforced the enduring value of semantic markup, CSS layout fundamentals, and intentional performance budgeting for public community web applications.',
    permissionStatus: 'public',
    relatedSlugs: ['key-detective', 'parish-records'],
  },
  {
    slug: 'singha-pos',
    number: '04',
    title: 'Singha Hardware POS',
    category: 'Enterprise / Systems',
    tag: 'Systems',
    summary: 'Enterprise point-of-sale and multi-warehouse inventory traceability system built at The Heaven’s Code.',
    role: 'Full Stack Developer',
    period: 'The Heaven’s Code',
    stack: ['Angular', 'Spring Boot', 'PostgreSQL', 'REST APIs'],
    featured: false,
    visual: 'systems',
    problem:
      'High-volume retail hardware operations require rapid barcode billing, multi-store stock reconciliation, and audit-grade transaction ledgers.',
    approach:
      'Contributed to full-stack features including modular POS checkout flows, automated stock ledger adjustments, and secure role-based administrative portals.',
    architecture: [
      'Frontend: Modular Angular SPA with reactive forms and instant barcode scanning lookup.',
      'Backend: Spring Boot REST services with ACID transaction boundaries for concurrent sales.',
      'Database: Relational PostgreSQL schema with automated stock deduction triggers.',
    ],
    highlights: [
      'Accelerated checkout speeds during peak commercial store hours',
      'Audit-proof transaction trails and automated inventory balance checks',
      'Role-based permissions separating cashiers, managers, and system administrators',
    ],
    outcomeOrLearning:
      'Strengthened understanding of enterprise transaction isolation, concurrent inventory locks, and production-grade full-stack patterns.',
    permissionStatus: 'client-confidential-summary',
    relatedSlugs: ['agentry', 'parish-records'],
  },
  {
    slug: 'parish-records',
    number: '05',
    title: 'Parish Family-Book System',
    category: 'Enterprise / Systems',
    tag: 'Systems',
    summary: 'A secure digital parish registry and genealogical census system built at The Heaven’s Code.',
    role: 'Full Stack Developer',
    period: 'The Heaven’s Code',
    stack: ['Angular', 'Spring Boot', 'PostgreSQL', 'Tailwind CSS'],
    featured: false,
    visual: 'systems',
    problem:
      'Historical parish census records existed primarily on paper ledgers, making genealogy searches and sacrament documentation vulnerable to physical wear and slow retrieval.',
    approach:
      'Engineered structured family-tree mapping and record search features, converting paper records into an indexed, searchable, and privacy-preserving relational archive.',
    architecture: [
      'Hierarchical Records: Structured family unit models with relational links between households and members.',
      'REST Validation: Robust Spring Boot validation preventing duplicate or conflicting family entries.',
      'Security: Role-based data access ensuring parishioner privacy and strict administrative audit trails.',
    ],
    highlights: [
      'Instant genealogy and sacrament record lookup across large parish registries',
      'Strict privacy boundaries protecting personal member data',
      'Simplified multi-generational family record creation flows',
    ],
    outcomeOrLearning:
      'Learned the importance of modeling complex real-world relationships in relational databases while maintaining rigorous privacy and data integrity.',
    permissionStatus: 'client-confidential-summary',
    relatedSlugs: ['youth-ministry', 'singha-pos'],
  },
] as const;

export function getAllProjects(): readonly Project[] {
  return projects;
}

export function getFeaturedProjects(): readonly Project[] {
  return projects.filter(p => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

export function getRelatedProjects(slug: string): readonly Project[] {
  const current = getProjectBySlug(slug);
  if (!current) return [];
  return current.relatedSlugs
    .map(relSlug => getProjectBySlug(relSlug))
    .filter((p): p is Project => Boolean(p));
}
