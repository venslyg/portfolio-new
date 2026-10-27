export const navigationItems = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'work', label: 'Work', href: '/projects' },
  { id: 'music', label: 'Music Lab', href: '/music' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'contact', label: 'Contact', href: '/#contact' },
] as const;

export type SectionId = (typeof navigationItems)[number]['id'];
