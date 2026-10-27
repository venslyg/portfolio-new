export type FeaturedProject = {
  id: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  contribution: string;
  stack: readonly string[];
  visual: 'music' | 'records' | 'community';
};

// Personal projects described in the CV. No client assets, invented results, or unverified URLs.
export const featuredProjects: readonly FeaturedProject[] = [
  {
    id: 'key-detective',
    number: '01',
    title: 'Key Detective',
    category: 'Music / Mobile',
    summary: 'A pitch-detection app with tools for musicians playing live in church.',
    contribution: 'Developed the mobile application and its pitch-detection functionality.',
    stack: ['Ionic', 'Angular', 'Pitchy'],
    visual: 'music',
  },
  {
    id: 'agentry',
    number: '02',
    title: 'Agentry',
    category: 'Records / Mobile',
    summary: 'A mobile application for managing agency records.',
    contribution: 'Developed the application using Flutter, Firebase, and SQLite.',
    stack: ['Flutter', 'Firebase', 'SQLite'],
    visual: 'records',
  },
  {
    id: 'youth-ministry',
    number: '03',
    title: 'Youth Ministry',
    category: 'Community / Web',
    summary: 'A website for the Apostolic Church National Youth Ministry.',
    contribution: 'Developed the website with HTML, CSS, and JavaScript.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    visual: 'community',
  },
];
