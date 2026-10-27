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
  image: string;
  repoUrl?: string;
  liveUrl?: string;
  relatedSlugs: readonly string[];
};

export const projects: readonly Project[] = [
  {
    slug: 'nehara-book-shop',
    number: '01',
    title: 'Nehara Book Shop E-commerce System',
    category: 'E-Commerce / Web',
    tag: 'Web',
    summary: 'Full-stack e-commerce web platform and administrative dashboard for Nehara Book Shop, integrated with Google Firebase Authentication.',
    role: 'Full Stack Developer',
    period: 'The Heaven’s Code',
    stack: ['Spring Boot', 'Angular', 'Firebase', 'PostgreSQL', 'TypeScript'],
    featured: true,
    visual: 'systems',
    image: '/images/projects/nehara-book-shop.jpg',
    problem:
      'Nehara Book Shop required an efficient digital storefront and an inventory-integrated administrative dashboard with seamless customer authentication.',
    approach:
      'Contributed to the e-commerce client storefront and administrative portal, leveraging Spring Boot for backend services, Angular for the web frontend, and Firebase for streamlined Google authentication.',
    architecture: [
      'Storefront & Admin: Angular SPA providing product catalog discovery, cart management, and real-time inventory adjustments.',
      'Backend Services: Spring Boot REST APIs handling orders, catalog operations, and transactional records.',
      'Authentication: Firebase Google Authentication paired with JWT role security for shoppers and administrators.',
      'Database: PostgreSQL relational schema ensuring ACID-compliant transaction persistence.',
    ],
    highlights: [
      'Live commercial web platform accessible at www.nehara.lk',
      'Seamless Google sign-in integration via Firebase Authentication',
      'Comprehensive administrative catalog, pricing, and sales tracking dashboard',
    ],
    outcomeOrLearning:
      'Strengthened expertise in commercial e-commerce architecture, third-party OAuth flows with Firebase, and scalable full-stack Spring Boot/Angular design.',
    permissionStatus: 'public',
    liveUrl: 'https://www.nehara.lk',
    relatedSlugs: ['singha-pos', 'pmb-traceability'],
  },
  {
    slug: 'singha-pos',
    number: '02',
    title: 'Singha Hardware POS System',
    category: 'Enterprise / Systems',
    tag: 'Systems',
    summary: 'Point-of-sale retail system with custom Flutter hardware receipt printer-driver integration built at The Heaven’s Code.',
    role: 'Full Stack Developer',
    period: 'The Heaven’s Code',
    stack: ['Spring Boot', 'Angular', 'Flutter', 'PostgreSQL'],
    featured: true,
    visual: 'systems',
    image: '/images/projects/singha-pos.jpg',
    problem:
      'Hardware retail stores experience high checkout volume requiring rapid barcode billing, instant thermal receipt printing, and real-time multi-store stock ledger updates.',
    approach:
      'Contributed to point-of-sale features in Angular and Spring Boot, and engineered the hardware printer-driver component utilizing Flutter.',
    architecture: [
      'Printer Driver: Flutter desktop module interfacing with physical point-of-sale thermal receipt printers for rapid ticket dispatch.',
      'Billing Terminal: Angular single-page application optimized for rapid keyboard and barcode scanner checkout.',
      'Backend API: Spring Boot services with ACID transaction boundaries for atomic invoice generation.',
      'Data Store: PostgreSQL schema tracking inventory stock balances across retail outlets.',
    ],
    highlights: [
      'Integrated Flutter-based receipt printer driver for rapid ticket emission',
      'Sub-second barcode checkout reducing counter wait times during peak hours',
      'Audit-grade transaction ledgers with automatic inventory deductions',
    ],
    outcomeOrLearning:
      'Gained specialized experience connecting web POS applications to physical retail hardware devices using Flutter, alongside enterprise transactional backend systems.',
    permissionStatus: 'client-confidential-summary',
    relatedSlugs: ['nehara-book-shop', 'pmb-traceability'],
  },
  {
    slug: 'pmb-traceability',
    number: '03',
    title: 'PMB Traceability – Warehouse Module',
    category: 'Logistics / Web',
    tag: 'Web',
    summary: 'Warehouse management and consignment batch traceability frontend module built for the Paddy Marketing Board (PMB) at The Heaven’s Code.',
    role: 'Frontend Developer',
    period: 'The Heaven’s Code',
    stack: ['Angular', 'TypeScript', 'RxJS', 'REST APIs'],
    featured: true,
    visual: 'records',
    image: '/images/projects/pmb-traceability.jpg',
    problem:
      'National agricultural grain distribution requires rigorous batch-level traceability, storage bin tracking, and consignment intake logging to prevent logistics bottlenecks.',
    approach:
      'Contributed to the warehouse module frontend development in Angular, engineering consignment intake forms, batch lookup tables, and visual storage status monitors.',
    architecture: [
      'Domain Modularization: Cleanly structured Angular warehouse domain module with route-level lazy loading.',
      'Reactive State: RxJS data streams handling real-time stock filters, consignment verification, and batch statuses.',
      'Input Validation: Multi-step Angular reactive forms with strict consignment compliance rule checks.',
    ],
    highlights: [
      'Streamlined warehouse intake and dispatch logging for national grain distribution',
      'High-density responsive data tables for rapid consignment inspection',
      'Clean modular Angular architecture following enterprise design principles',
    ],
    outcomeOrLearning:
      'Deepened mastery of enterprise Angular patterns, reactive form hierarchies, and mission-critical logistics domain modeling.',
    permissionStatus: 'client-confidential-summary',
    relatedSlugs: ['singha-pos', 'parish-records'],
  },
  {
    slug: 'parish-records',
    number: '04',
    title: 'Catholic Parish Family Book Management',
    category: 'Community / Systems',
    tag: 'Systems',
    summary: 'Digital family book management and census system developed for the Catholic Parish in Katuneriya at The Heaven’s Code.',
    role: 'Full Stack Developer',
    period: 'The Heaven’s Code',
    stack: ['Go', 'Angular', 'PostgreSQL', 'TypeScript'],
    featured: true,
    visual: 'systems',
    image: '/images/projects/parish-records.jpg',
    problem:
      'Parish family records in Katuneriya existed in traditional paper books, making genealogy searches, member verifications, and sacrament tracking vulnerable to loss and slow retrieval.',
    approach:
      'Developed a modern digital family book management system featuring hierarchical household modeling, fast Go backend services, and an accessible Angular interface.',
    architecture: [
      'Go Backend: High-throughput, lightweight Go REST services handling parish family census indexing and records.',
      'Angular Frontend: Modern interface tailored for parish clerks to effortlessly navigate family lineage records.',
      'Relational PostgreSQL: Normalized relational schema mapping multi-generational households with strict data integrity.',
    ],
    highlights: [
      'Preserved historical parish family books in resilient digital formats',
      'High-performance Go backend with sub-millisecond query responses',
      'Instant genealogy and sacrament record lookup across thousands of household members',
    ],
    outcomeOrLearning:
      'Strengthened backend development in Go, relational data modeling for genealogical trees, and archival privacy best practices.',
    permissionStatus: 'client-confidential-summary',
    relatedSlugs: ['youth-ministry', 'singha-pos'],
  },
  {
    slug: 'agentry',
    number: '05',
    title: 'Agentry Mobile Application',
    category: 'Records / Mobile',
    tag: 'Mobile',
    summary: 'An offline-first cross-platform mobile record-keeping system for agency field operations and client directories.',
    role: 'Mobile Developer',
    period: 'Personal Project',
    stack: ['Flutter', 'Firebase', 'SQLite', 'Dart'],
    featured: true,
    visual: 'records',
    image: '/images/projects/agentry.jpg',
    problem:
      'Field agents regularly visit remote sites where cellular data is intermittent or absent, making cloud-only CRM tools unusable and risking critical record loss.',
    approach:
      'Designed an offline-first mobile architecture utilizing SQLite for instant local read and write operations, paired with Firebase for cloud synchronization upon network reconnection.',
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
    number: '06',
    title: 'Apostolic Church National Youth Ministry',
    category: 'Community / Web',
    tag: 'Web',
    summary: 'Official responsive web presence and resource hub engineered for the Apostolic Church National Youth Ministry community.',
    role: 'Web Developer',
    period: 'Personal / Community Project',
    stack: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    featured: true,
    visual: 'community',
    image: '/images/projects/youth-ministry.jpg',
    problem:
      'The national youth fellowship required an accessible, high-performance digital touchpoint for event updates, ministry resources, and community announcements across diverse devices.',
    approach:
      'Developed a lightweight, highly responsive website using clean semantic HTML5, modern CSS layout architectures, and vanilla JavaScript for maximum speed and accessibility.',
    architecture: [
      'Semantic Document Structure: Accessible heading hierarchy adhering to strict accessibility standards.',
      'Zero Framework Overhead: Pure CSS flexbox and grid layouts delivering instant page loads.',
      'Cross-Device Responsiveness: Seamlessly optimized for smartphones, tablets, and desktop displays.',
    ],
    highlights: [
      'Live official website operational at www.acslnym.org',
      'Sub-second page load times across mobile 3G and 4G networks',
      'Zero third-party runtime dependencies for maximum reliability',
    ],
    outcomeOrLearning:
      'Demonstrated how semantic fundamentals and lightweight vanilla web technologies deliver exceptional performance and reliability.',
    permissionStatus: 'public',
    liveUrl: 'https://www.acslnym.org',
    relatedSlugs: ['key-detective', 'parish-records'],
  },
  {
    slug: 'key-detective',
    number: '07',
    title: 'Key Detective Pitch-Detection App',
    category: 'Music / Mobile',
    tag: 'Music',
    summary: 'A real-time pitch-detection mobile app tailored for acoustic environments and live worship musicians.',
    role: 'Mobile Developer & Creator',
    period: 'Personal Project',
    stack: ['Angular', 'Ionic', 'Pitchy', 'Web Audio API', 'TypeScript'],
    featured: true,
    visual: 'music',
    image: '/images/projects/key-detective.jpg',
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
    slug: 'garment-management',
    number: '08',
    title: 'Garment Management System',
    category: 'Enterprise / Systems',
    tag: 'Systems',
    summary: 'Desktop enterprise application automating apparel production management, employee tracking, supplier relations, and inventory.',
    role: 'Desktop & Database Developer',
    period: 'Personal Project',
    stack: ['C#', '.NET', 'Microsoft SQL', 'XML'],
    featured: true,
    visual: 'systems',
    image: '/images/projects/garment-management.jpg',
    problem:
      'Apparel manufacturing operations face heavy administrative friction coordinating raw fabric procurement, employee shift output, cutting/stitching stages, and warehouse stock.',
    approach:
      'Engineered an automated .NET Windows desktop solution backed by Microsoft SQL Server and XML configurations to integrate production management, workforce tracking, and inventory control.',
    architecture: [
      'Desktop Client: C# .NET desktop interface with modular panels for production lines, HR shifts, and supplier accounts.',
      'Database Engine: Normalized Microsoft SQL database enforcing referential integrity and transactional stock deductions.',
      'Data Exchange: XML schemas for batch configuration and operational reporting export.',
    ],
    highlights: [
      'Automated entire garment manufacturing lifecycle from fabric intake to finished goods',
      'Employee attendance, workstation allocation, and piece-rate productivity metrics',
      'Automated supplier order tracking and material stock reorder alerts',
    ],
    outcomeOrLearning:
      'Deepened understanding of desktop software architecture in .NET, relational database tuning in MS SQL, and workflow automation in manufacturing.',
    permissionStatus: 'public',
    relatedSlugs: ['hospital-management', 'singha-pos'],
  },
  {
    slug: 'hospital-management',
    number: '09',
    title: 'Hospital Management System',
    category: 'Healthcare / Web',
    tag: 'Web',
    summary: 'Healthcare management web application orchestrating patient appointments, clinic wards, and doctor schedules.',
    role: 'Full Stack Developer',
    period: 'Personal Project',
    stack: ['Java', 'Spring Boot', 'React', 'MySQL', 'REST APIs'],
    featured: true,
    visual: 'records',
    image: '/images/projects/hospital-management.jpg',
    problem:
      'Clinical facilities struggle with overlapping doctor consultations, ward occupancy tracking, and delayed patient appointment bookings without a synchronized medical portal.',
    approach:
      'Engineered a full-stack clinical management web application with a responsive React frontend, Spring Boot REST microservices, and a robust MySQL database.',
    architecture: [
      'Frontend Dashboard: React single-page application with interactive calendar scheduling and ward allocation views.',
      'Service Layer: Java Spring Boot REST controllers with appointment slot conflict-detection algorithms.',
      'Relational Database: MySQL database schema maintaining patient medical records, doctor timetables, and ward capacity.',
    ],
    highlights: [
      'Conflict-free automated appointment scheduling for specialized medical practitioners',
      'Real-time bed availability tracking across hospital wards',
      'Secure patient registration and medical consultation history log',
    ],
    outcomeOrLearning:
      'Mastered the integration of React with Java Spring Boot backends, medical data domain modeling, and concurrent scheduling algorithms.',
    permissionStatus: 'public',
    relatedSlugs: ['garment-management', 'nehara-book-shop'],
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
