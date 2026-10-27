import type { ReactNode } from 'react';

type ToolItem = {
  name: string;
  category: 'Frontend' | 'Backend' | 'Mobile' | 'Data & Cloud' | 'Tools';
  icon: ReactNode;
};

export const toolsList: readonly ToolItem[] = [
  {
    name: 'React',
    category: 'Frontend',
    icon: (
      <svg className="h-10 w-10" viewBox="-11.5 -10.23174 23 20.46348">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: 'Angular',
    category: 'Frontend',
    icon: (
      <svg className="h-10 w-10" viewBox="0 0 250 250">
        <polygon points="125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 125,230 203.9,186.3 218.1,63.2" fill="#DD0031" />
        <polygon points="125,30 125,52.2 125,52.1 125,153.4 125,153.4 125,230 125,230 203.9,186.3 218.1,63.2" fill="#C3002F" />
        <path d="M125,52.1L66.8,182.6h21.7l11.7-29.2h49.4l11.7,29.2h21.7L125,52.1z M141.6,135h-33.3l16.6-41.2L141.6,135z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: 'Spring Boot',
    category: 'Backend',
    icon: (
      <svg className="h-10 w-10" viewBox="0 0 100 100">
        <path
          d="M87.2 38.6c-1.3-10.4-8.8-19.4-18.9-22.7-10.1-3.3-21.2-.5-28.5 7.2L17.5 45.4C8.6 54.3 7 68.1 13.7 78.8c6.6 10.6 19.3 15.7 31.3 12.4l30.9-8.4c8.8-2.4 15.6-9.5 17.6-18.4 2-8.9-.7-18.1-6.3-25.8z"
          fill="#6DB33F"
        />
        <path
          d="M51.5 35.8c-2.4-1.2-5.3-.2-6.5 2.2L34.2 60.1c-1.2 2.4-.2 5.3 2.2 6.5 2.4 1.2 5.3.2 6.5-2.2l10.8-22.1c1.2-2.4.2-5.3-2.2-6.5z"
          fill="#FFFFFF"
        />
        <path
          d="M62.8 45.3c-2.4-1.2-5.3-.2-6.5 2.2l-7.2 14.7c-1.2 2.4-.2 5.3 2.2 6.5 2.4 1.2 5.3.2 6.5-2.2l7.2-14.7c1.2-2.4.2-5.3-2.2-6.5z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    name: 'Flutter',
    category: 'Mobile',
    icon: (
      <svg className="h-10 w-10" viewBox="0 0 166 202">
        <path d="M100.3 0L0 100.3l31.1 31.1 131.4-131.4z" fill="#47C5FB" />
        <path d="M100.3 84.7l-46.7 46.7 31.1 31.1 46.7-46.7z" fill="#02569B" />
        <path d="M69.2 147l31.1 31.1 65.7-65.7-31.1-31.1z" fill="#0175C2" />
        <path d="M100.3 178.1l31.1 23.9 34.6-34.6-20.7-20.7z" fill="#02569B" />
      </svg>
    ),
  },
  {
    name: '.NET',
    category: 'Backend',
    icon: (
      <svg className="h-10 w-10" viewBox="0 0 128 128">
        <rect width="128" height="128" rx="24" fill="#512BD4" />
        <path
          d="M34.8 84.5V43.5h7.2l17.4 25.2V43.5h7.2v41h-6.7L42 58.7v25.8h-7.2zm44.2 0V43.5h23.1v6.5H86.2v10.8h13.9v6.5H86.2v10.7h16.2v6.5H79zm-53.7-6.2c0-2.4 1.9-4.3 4.3-4.3s4.3 1.9 4.3 4.3-1.9 4.3-4.3 4.3-4.3-1.9-4.3-4.3z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    category: 'Backend',
    icon: (
      <svg className="h-10 w-10" viewBox="0 0 32 32">
        <path
          d="M16 2.5L3.5 9.7v14.6L16 31.5l12.5-7.2V9.7L16 2.5zm-.8 20.3c-.3 0-.6-.1-.9-.2l-5.6-3.2c-.5-.3-.9-.9-.9-1.5v-6.5c0-.6.3-1.2.9-1.5l5.6-3.2c.6-.3 1.2-.3 1.8 0l5.6 3.2c.5.3.9.9.9 1.5v6.5c0 .6-.3 1.2-.9 1.5l-5.6 3.2c-.3.1-.6.2-.9.2z"
          fill="#339933"
        />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    category: 'Frontend',
    icon: (
      <svg className="h-10 w-10" viewBox="0 0 128 128">
        <rect width="128" height="128" rx="20" fill="#3178C6" />
        <path
          d="M70.5 86.8c2.8 1.8 6.4 2.9 10.3 2.9 8.2 0 13.2-4.4 13.2-11.2 0-6.4-4.5-9.6-12.7-12.8-9.4-3.7-13.8-7.8-13.8-15.5 0-8.9 7-15.6 18.2-15.6 4.6 0 8.8 1.1 11.8 2.8l-2.7 7.4c-2.3-1.4-5.6-2.5-9.2-2.5-6.5 0-10.4 3.9-10.4 8.7 0 5.6 4.1 8.3 12.1 11.6 9.9 4 14.5 8.2 14.5 16.7 0 9.7-7.4 16.8-20.9 16.8-5.3 0-10.7-1.4-13.7-3.2l3.2-8.1zM28 43.5h33.8v7.8H48.7V105H40.2V51.3H28v-7.8z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    category: 'Data & Cloud',
    icon: (
      <svg className="h-10 w-10" viewBox="0 0 128 128">
        <path
          d="M64 4C30.9 4 4 30.9 4 64s26.9 60 60 60 60-26.9 60-60S97.1 4 64 4zm28.8 74.4c-.6 3.6-2.9 8.8-6.8 12-4.5 3.8-11.2 5.1-16.7 3.5-3.3-1-5.7-3.1-7.8-5.7-1.5-1.9-2.7-4.1-3.6-6.4-1.9.4-3.8.6-5.7.6-6.5 0-12.7-2.7-17-7.4-4.7-5.1-7.1-12-6.7-19.1.5-8.3 4.5-15.9 11-20.6 6.3-4.5 14.3-6.2 22-4.5 8.4 1.8 15.3 7.8 18.5 15.8 4.2 2 8 4.9 11 8.6 3.5 4.3 5.3 9.7 5 15.2-.2 2.8-.7 5.7-1.2 8.4z"
          fill="#336791"
        />
        <path
          d="M66.4 51.5c-4.4-.9-9 .1-12.5 2.6-3.6 2.6-5.8 6.9-6.1 11.5-.2 3.9 1.1 7.8 3.7 10.6 2.4 2.6 5.8 4.1 9.5 4.1 1.1 0 2.2-.1 3.3-.4 1.2-2.3 2.8-4.3 4.8-5.9 2.5-2 5.4-3.2 8.5-3.6-2.1-7.9-6.1-17.6-11.2-18.9z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    name: 'Firebase',
    category: 'Data & Cloud',
    icon: (
      <svg className="h-10 w-10" viewBox="0 0 128 128">
        <path d="M22.9 98.2L3.1 82.5c-2.4-1.9-2.9-5.4-1.1-7.9 1-1.3 2.6-2 4.2-2 .8 0 1.6.2 2.3.6l14.4 8.7 17.6-33.6c1.6-3.1 5.3-4.2 8.3-2.6 1.8 1 2.9 2.8 3 4.8l7 48.7-35.9-.9z" fill="#FFA000" />
        <path d="M68.8 40.5c1.4-2.8 4.8-4 7.6-2.6 1.6.8 2.7 2.3 3 4l12.4 75.3-47.5.3 24.5-77z" fill="#F57C00" />
        <path d="M124.9 98.2l-33.1 20.9-23-19.9L79 24.3c.7-3.1 3.8-5.1 6.9-4.4 1.8.4 3.4 1.7 4.1 3.3l34.9 75z" fill="#FFCA28" />
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    category: 'Frontend',
    icon: (
      <svg className="h-10 w-10" viewBox="0 0 32 32">
        <path
          d="M9 13.5c1.5-3 3.5-4.5 6-4.5 3.75 0 5.25 3 6.75 4.5 1.5 1.5 2.75 2.25 4.75 2.25 2.5 0 4.25-1.5 5.5-4.5-1.5 3-3.5 4.5-6 4.5-3.75 0-5.25-3-6.75-4.5-1.5-1.5-2.75-2.25-4.75-2.25-2.5 0-4.25 1.5-5.5 4.5zm-8 9c1.5-3 3.5-4.5 6-4.5 3.75 0 5.25 3 6.75 4.5 1.5 1.5 2.75 2.25 4.75 2.25 2.5 0 4.25-1.5 5.5-4.5-1.5 3-3.5 4.5-6 4.5-3.75 0-5.25-3-6.75-4.5-1.5-1.5-2.75-2.25-4.75-2.25-2.5 0-4.25 1.5-5.5 4.5z"
          fill="#06B6D4"
        />
      </svg>
    ),
  },
  {
    name: 'Docker',
    category: 'Tools',
    icon: (
      <svg className="h-10 w-10" viewBox="0 0 128 128">
        <path
          d="M121.2 56.5c-3-2.1-7.2-2.7-10.7-1.7-1.8-6.8-6.8-12.3-13.4-15.1l-2.1-.9-.9 2c-3.1 7.1-1.7 15.4 3.4 21.2-3.8 2.2-8.5 2.4-12.7 1.2-7.2-2.1-14.7-2.6-22.1-1.6l-2 .3.3 2c1.2 8.3 5.4 16 11.8 21.3 6.5 5.4 14.7 8.3 23.3 8.3 22.9 0 42.4-13.5 50.1-34.1.3-.9.1-1.9-.5-2.6-.5-.8-1.5-1.3-2.5-1.3zm-51.4-8.8H60V38h9.8v9.7zm-14.5 0h-9.8V38h9.8v9.7zm-14.5 0H31V38h9.8v9.7zm29 14.5H60v-9.8h9.8v9.8zm-14.5 0h-9.8v-9.8h9.8v9.8zm-14.5 0H31v-9.8h9.8v9.8zm-14.5 0H16.3v-9.8h9.8v9.8zm43.5 0h-9.8v-9.8h9.8v9.8z"
          fill="#2496ED"
        />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    category: 'Tools',
    icon: (
      <svg className="h-10 w-10" viewBox="0 0 24 24" fill="#181717">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    ),
  },
  {
    name: 'Python',
    category: 'Backend',
    icon: (
      <svg className="h-10 w-10" viewBox="0 0 128 128">
        <path
          d="M63.2 5.5c-27.6 0-25.9 12-25.9 12l.1 12.4h26.4v3.7H26.3S6.6 31.4 6.6 59.2c0 27.7 17.3 26.8 17.3 26.8h10.3v-14.5s-.6-17.3 17.1-17.3h26.3v-26s.8-22.7-14.4-22.7zm-14.6 8.2c2.6 0 4.7 2.1 4.7 4.7s-2.1 4.7-4.7 4.7-4.7-2.1-4.7-4.7 2.1-4.7 4.7-4.7z"
          fill="#3776AB"
        />
        <path
          d="M64.8 122.5c27.6 0 25.9-12 25.9-12l-.1-12.4H64.2v-3.7h37.5s19.7 2.2 19.7-25.6c0-27.7-17.3-26.8-17.3-26.8H113.8v14.5s.6 17.3-17.1 17.3H70.4v26s-.8 22.7 14.4 22.7zm14.6-8.2c-2.6 0-4.7-2.1-4.7-4.7s2.1-4.7 4.7-4.7 4.7 2.1 4.7 4.7-2.1 4.7-4.7 4.7z"
          fill="#FFD43B"
        />
      </svg>
    ),
  },
  {
    name: 'Ionic',
    category: 'Mobile',
    icon: (
      <svg className="h-10 w-10" viewBox="0 0 512 512">
        <path
          d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm0 336c-70.7 0-128-57.3-128-128s57.3-128 128-128 128 57.3 128 128-57.3 128-128 128z"
          fill="#3880FF"
        />
        <circle cx="256" cy="256" r="64" fill="#3880FF" />
      </svg>
    ),
  },
  {
    name: 'SQLite',
    category: 'Data & Cloud',
    icon: (
      <svg className="h-10 w-10" viewBox="0 0 128 128">
        <path
          d="M64 4c-33.1 0-60 26.9-60 60s26.9 60 60 60 60-26.9 60-60S97.1 4 64 4zm18.7 87.2c-4.8 2.2-10.7 3.5-17.2 3.5-18.4 0-29.3-10.4-29.3-27.8 0-17.9 11.5-28.7 30.6-28.7 6.1 0 11.6 1.1 15.9 3.1l-2.4 8.7c-3.6-1.6-8.2-2.6-13.1-2.6-12.7 0-20.1 7.2-20.1 19.3 0 11.6 7 18.7 19.4 18.7 5.1 0 10.1-1.1 14.1-2.8l2.1 8.6z"
          fill="#003B57"
        />
      </svg>
    ),
  },
  {
    name: 'Figma',
    category: 'Tools',
    icon: (
      <svg className="h-10 w-10" viewBox="0 0 38 57">
        <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
        <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
        <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
        <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
      </svg>
    ),
  },
  {
    name: 'MySQL',
    category: 'Data & Cloud',
    icon: (
      <svg className="h-10 w-10" viewBox="0 0 128 128">
        <path
          d="M64 4C30.9 4 4 30.9 4 64s26.9 60 60 60 60-26.9 60-60S97.1 4 64 4zm32.8 77.2c-4.7 1.8-10.2 2.8-16.1 2.8-17.8 0-29.2-9.7-29.2-25.1 0-16.2 11.8-26.3 30.5-26.3 5.4 0 10.3.9 14.8 2.6V44c-4.2-1.6-8.9-2.4-14.4-2.4-14.1 0-22.3 7.8-22.3 19.6 0 11.4 7.8 19 21.6 19 5.3 0 10.2-.8 15.1-2.4v3.4z"
          fill="#4479A1"
        />
        <path d="M84.2 46.5c3.2-1.9 6.8-2.9 10.6-2.9v8.3c-2.9 0-5.7.8-8.2 2.2l-2.4-7.6z" fill="#DE8A10" />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    category: 'Frontend',
    icon: (
      <svg className="h-10 w-10" viewBox="0 0 180 180" fill="none">
        <mask id="mask0" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
          <circle cx="90" cy="90" r="90" fill="black" />
        </mask>
        <g mask="url(#mask0)">
          <circle cx="90" cy="90" r="90" fill="black" />
          <path
            d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
            fill="url(#paint0_linear)"
          />
          <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear)" />
        </g>
        <defs>
          <linearGradient id="paint0_linear" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="paint1_linear" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
] as const;

export function ToolsGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 sm:gap-6">
      {toolsList.map(tool => (
        <div
          key={tool.name}
          className="group relative flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl bg-white p-4 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-accent/20 sm:p-5"
        >
          <div className="flex h-12 w-12 items-center justify-center transition-transform duration-300 group-hover:scale-110">
            {tool.icon}
          </div>
          <span className="font-sans text-xs font-semibold tracking-tight text-slate-800 transition-colors group-hover:text-black sm:text-sm">
            {tool.name}
          </span>
        </div>
      ))}
    </div>
  );
}
