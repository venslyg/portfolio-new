// Public profile facts checked against the supplied CV.
export const profile = {
  name: 'Vensly Gunasekara',
  role: 'Full-Stack Software Engineer',
  email: 'venslygunasekara2002@gmail.com',
  phone: '+94 77 034 1303',
  phoneRaw: '+94770341303',
  whatsapp: 'https://wa.me/94770341303',
  github: 'https://github.com/venslyg',
  linkedin: 'https://www.linkedin.com/in/gvbenaya/',
} as const;

export const technologies = ['Angular', 'Spring Boot', 'Flutter', 'React', 'PostgreSQL'];

export const experience = [
  {
    period: 'Jun 2026 — Present',
    title: 'Full Stack Developer',
    organization: 'The Heaven’s Code',
    description: 'Contributing to client web and mobile applications, including e-commerce, point-of-sale, and management systems.',
  },
  {
    period: 'Dec 2025 — Jun 2026',
    title: 'Full Stack Developer Intern',
    organization: 'The Heaven’s Code',
    description: 'A six-month full-stack development internship, followed by a transition to a permanent developer role.',
  },
  {
    period: '2023 — 2025',
    title: 'Software Engineering',
    organization: 'NIBM',
    description: 'Completed a Diploma and Higher National Diploma in Software Engineering.',
  },
] as const;

export const skillGroups = [
  { title: 'Interfaces', description: 'Building for the browser.', items: ['Angular', 'React', 'HTML & CSS'] },
  { title: 'Services', description: 'Connecting the pieces.', items: ['Spring Boot', '.NET', 'Go'] },
  { title: 'Mobile', description: 'Software beyond the desktop.', items: ['Flutter', 'Ionic', 'Dart'] },
  { title: 'Data & tools', description: 'Supporting the application.', items: ['PostgreSQL', 'Firebase', 'Git'] },
] as const;
