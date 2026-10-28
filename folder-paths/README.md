# Vensly Portfolio — Complete Codebase Architecture & Editing Guide

This guide details **where every single feature, piece of text, 3D element, instrument, project, and contact detail lives** so you can easily customize and edit anything in your portfolio.

---

## Quick Reference Table: "Where do I edit...?"

| What you want to edit | Exact File Path |
|---|---|
| **Your Name, Bio, Email, Phone, WhatsApp, LinkedIn, GitHub** | [`src/content/profile.ts`](file:///e:/vensly%20learn/portfolio/vensly-portfolio/src/content/profile.ts) |
| **All Projects (Titles, Case Studies, Tags, Links, Images, CV details)** | [`src/content/projects.ts`](file:///e:/vensly%20learn/portfolio/vensly-portfolio/src/content/projects.ts) |
| **Hero Headline ("Engineering ideas in rhythm"), Philosophy & CTAs** | [`src/components/hero/hero-story-steps/hero-story-steps.tsx`](file:///e:/vensly%20learn/portfolio/vensly-portfolio/src/components/hero/hero-story-steps/hero-story-steps.tsx) |
| **"Scroll to Explore" Indicator (Nuralis-style Mouse & Chevron)** | [`src/components/hero/scroll-prompt/scroll-prompt.tsx`](file:///e:/vensly%20learn/portfolio/vensly-portfolio/src/components/hero/scroll-prompt/scroll-prompt.tsx) |
| **Pinned Hero Scrollytelling Runway (`380vh` sticky canvas)** | [`src/components/hero/harmonic-stage-hero/harmonic-stage-hero.tsx`](file:///e:/vensly%20learn/portfolio/vensly-portfolio/src/components/hero/harmonic-stage-hero/harmonic-stage-hero.tsx) |
| **3D Piano / Synthesizer, Drum Set & Electric Guitar** | [`src/components/three/stage-instruments/stage-instruments.tsx`](file:///e:/vensly%20learn/portfolio/vensly-portfolio/src/components/three/stage-instruments/stage-instruments.tsx) |
| **3D Floating Stage (Size, Chassis, Podium Plinth, Underglow)** | [`src/components/three/harmonic-stage/harmonic-stage.tsx`](file:///e:/vensly%20learn/portfolio/vensly-portfolio/src/components/three/harmonic-stage/harmonic-stage.tsx) |
| **3D Harmonic Core, EQ Waveform Bars & Floating Musical Notes** | [`src/components/three/harmonic-core/harmonic-core.tsx`](file:///e:/vensly%20learn/portfolio/vensly-portfolio/src/components/three/harmonic-core/harmonic-core.tsx) |
| **3D Neon Rings, Gyro Halo, Console Ticks & Vertical Separation** | [`src/components/three/stage-rings/stage-rings.tsx`](file:///e:/vensly%20learn/portfolio/vensly-portfolio/src/components/three/stage-rings/stage-rings.tsx) |
| **3D Code Brackets (`{ }`, `=>`, `</>`) & Holographic HUD Panels** | [`src/components/three/code-elements/code-elements.tsx`](file:///e:/vensly%20learn/portfolio/vensly-portfolio/src/components/three/code-elements/code-elements.tsx) |
| **3D Floating Harmonic Dust Particles** | [`src/components/three/music-particles/music-particles.tsx`](file:///e:/vensly%20learn/portfolio/vensly-portfolio/src/components/three/music-particles/music-particles.tsx) |
| **3D Camera Angle, Distance & Scroll Movement** | [`src/components/three/camera-controller/camera-controller.tsx`](file:///e:/vensly%20learn/portfolio/vensly-portfolio/src/components/three/camera-controller/camera-controller.tsx) |
| **Scroll Dispersion Tracking & Milestones (`0.0 - 1.0`, steps 0-3)** | [`src/hooks/use-stage-scroll/use-stage-scroll.ts`](file:///e:/vensly%20learn/portfolio/vensly-portfolio/src/hooks/use-stage-scroll/use-stage-scroll.ts) |
| **Technology Strip Beneath Hero (Pills & Badges)** | [`src/components/sections/proof-strip/proof-strip.tsx`](file:///e:/vensly%20learn/portfolio/vensly-portfolio/src/components/sections/proof-strip/proof-strip.tsx) |
| **Selected Work Section & Horizontal Carousel** | [`src/components/sections/featured-work-section/featured-work-section.tsx`](file:///e:/vensly%20learn/portfolio/vensly-portfolio/src/components/sections/featured-work-section/featured-work-section.tsx) & [`src/components/projects/project-slider/project-slider.tsx`](file:///e:/vensly%20learn/portfolio/vensly-portfolio/src/components/projects/project-slider/project-slider.tsx) |
| **Project Card Details & Modal Popup** | [`src/components/projects/project-card/project-card.tsx`](file:///e:/vensly%20learn/portfolio/vensly-portfolio/src/components/projects/project-card/project-card.tsx) |
| **Music Lab Section & 3D Acoustic Waveform** | [`src/components/sections/music-lab-section/music-lab-section.tsx`](file:///e:/vensly%20learn/portfolio/vensly-portfolio/src/components/sections/music-lab-section/music-lab-section.tsx) & [`src/components/three/acoustic-waveform/acoustic-waveform.tsx`](file:///e:/vensly%20learn/portfolio/vensly-portfolio/src/components/three/acoustic-waveform/acoustic-waveform.tsx) |
| **Experience Timeline (The Heaven's Code, NIBM)** | [`src/components/sections/experience-section/experience-section.tsx`](file:///e:/vensly%20learn/portfolio/vensly-portfolio/src/components/sections/experience-section/experience-section.tsx) |
| **Skills & Tools Grid (Tech Logos & Categories)** | [`src/components/sections/skills-section/skills-section.tsx`](file:///e:/vensly%20learn/portfolio/vensly-portfolio/src/components/sections/skills-section/skills-section.tsx) & [`src/components/skills/tools-grid/tools-grid.tsx`](file:///e:/vensly%20learn/portfolio/vensly-portfolio/src/components/skills/tools-grid/tools-grid.tsx) |
| **About Section & 3D Resonance Gyroscope** | [`src/components/sections/about-section/about-section.tsx`](file:///e:/vensly%20learn/portfolio/vensly-portfolio/src/components/sections/about-section/about-section.tsx) & [`src/components/three/resonance-gyroscope/resonance-gyroscope.tsx`](file:///e:/vensly%20learn/portfolio/vensly-portfolio/src/components/three/resonance-gyroscope/resonance-gyroscope.tsx) |
| **Contact Section & 3D Signal Beacon** | [`src/components/sections/contact-section/contact-section.tsx`](file:///e:/vensly%20learn/portfolio/vensly-portfolio/src/components/sections/contact-section/contact-section.tsx) & [`src/components/three/signal-beacon/signal-beacon.tsx`](file:///e:/vensly%20learn/portfolio/vensly-portfolio/src/components/three/signal-beacon/signal-beacon.tsx) |
| **Navigation Bar, Glassmorphism & Mobile Drawer** | [`src/components/layout/header/header.tsx`](file:///e:/vensly%20learn/portfolio/vensly-portfolio/src/components/layout/header/header.tsx) & [`src/components/layout/mobile-navigation/mobile-navigation.tsx`](file:///e:/vensly%20learn/portfolio/vensly-portfolio/src/components/layout/mobile-navigation/mobile-navigation.tsx) |
| **Colors, CSS Variables & Glassmorphism Tokens** | [`src/app/globals.css`](file:///e:/vensly%20learn/portfolio/vensly-portfolio/src/app/globals.css) |
| **CV PDF File (View CV button target)** | [`public/CV/vensly's CV.pdf`](file:///e:/vensly%20learn/portfolio/vensly-portfolio/public/CV/vensly's%20CV.pdf) |

---

## Detailed Directory Tree & Explanations

### 1. `src/content/` — All Text, Facts & Project Data
- **`profile.ts`**:
  - `name`, `role`, `email`, `phone`, `phoneRaw`, `whatsapp`, `github`, `linkedin`.
  - `technologies`: The technologies listed in the technology strip.
  - `experience`: Jobs, internships, education dates and descriptions.
  - `skillGroups`: Categorized skills (Interfaces, Services, Mobile, Data & tools).
- **`projects.ts`**:
  - Contains all case studies and projects (Nehara Book Shop, Singha Hardware POS, PMB Traceability, Catholic Parish Family Book, Agentry, Key Detective, Church Youth Website, etc.).
  - To change a project's live URL, GitHub URL, tags, summary, problem statement, or images, edit this file.

### 2. `src/components/three/` — 3D Visuals & WebGL Models
- **`harmonic-stage/harmonic-stage.tsx`**:
  - The root 3D assembly.
  - `scale={0.92}`: Controls how big the stage appears in the hero.
  - `rotation={[0.42, 0, 0]}`: Initial stage pitch tilt.
  - Controls turntable rotation in `useFrame`.
- **`stage-instruments/stage-instruments.tsx`**:
  - **Piano/Synthesizer**: White keys, black keys, OLED screen, pitch bend wheel, chassis.
  - **Drum Set**: Bass kick drum with glowing resonant head, snare on tripod, mounted high tom, floor tom, hi-hat and crash cymbals.
  - **Electric Guitar**: Contoured body, neon bevel rim, soundhole core, neck, frets, headstock with 6 tuning pegs, glowing laser strings, pickups.
  - Dispersion multipliers for how high each instrument floats during scroll.
- **`harmonic-core/harmonic-core.tsx`**:
  - Floating central orb (`coreGlow`).
  - Geodesic wireframe cage (`icosahedronGeometry`).
  - 24 radial audio equalizer spectrum bars with live bounce.
  - 5 curved musical staff lines.
  - 3 floating 3D musical notes (quarter and eighth notes).
- **`stage-rings/stage-rings.tsx`**:
  - Inner Lilac Energy Channel (`#A78BFA`).
  - Middle Cyan Laser Track (`#67E8F9`).
  - Outer Perimeter Neon Rim.
  - Holographic Gyro Halo (tilted ring with 4 glowing satellite markers).
  - 8 radial console stroke ticks.
  - Vertical separation rates on scroll.
- **`code-elements/code-elements.tsx`**:
  - Procedural 3D Code Brackets: `{` and `}`, `=>` arrow function, `</>` tag chevron.
  - Translucent Holographic HUD Panels displaying simulated code syntax lines and audio waveform diagnostics.
  - Orbiting chrome/cyan octahedron satellites.
- **`music-particles/music-particles.tsx`**:
  - 48 harmonic frequency dust particles using `THREE.Points` and additive blending.
- **`camera-controller/camera-controller.tsx`**:
  - Controls camera position (`x`, `y`, `z`) and `lookAt` target.
  - Smoothly damps scroll progress using `THREE.MathUtils.damp`.
- **`stage-lighting/stage-lighting.tsx`**:
  - Key, fill, rim, and specular lighting colors and intensities.
- **`acoustic-waveform/acoustic-waveform.tsx`**:
  - The compact regrouped 3D visual for the Music Lab teaser.
- **`holographic-disc/holographic-disc.tsx`**:
  - The rotating 3D vinyl disc in the Selected Work header.
- **`resonance-gyroscope/resonance-gyroscope.tsx`**:
  - The 3D gyroscope in the About section.
- **`signal-beacon/signal-beacon.tsx`**:
  - The 3D radar beacon in the Contact section.

### 3. `src/components/hero/` — Hero Layout & Scrollytelling
- **`harmonic-stage-hero/harmonic-stage-hero.tsx`**:
  - The master pinned scrollytelling runway (`h-[380vh]`).
  - Sticky full-bleed canvas container (`sticky top-0 h-screen w-full`).
  - Completely eliminates clipping: WebGL canvas spans 100vw × 100vh.
- **`scroll-prompt/scroll-prompt.tsx`**:
  - The Nuralis Labs-style animated "Scroll To Explore" mouse and bouncing chevron indicator.
  - Active only at scroll 0; automatically fades out as scrolling begins.
- **`hero-story-steps/hero-story-steps.tsx`**:
  - Staged editorial narrative cards positioned cleanly on the left:
    - **Step 1**: Main headline (`Engineering ideas in rhythm.`), badge, and subtext.
    - **Step 2**: Acoustic architecture philosophy (`Where code meets musical cadence.`) & feature pills.
    - **Step 3**: Available for engineering roles, `Let's talk`, `View CV`, and `Selected Work ↓`.

### 4. `src/components/sections/` — Homepage Sections
- **`proof-strip/proof-strip.tsx`**: Technology bridge beneath hero.
- **`featured-work-section/featured-work-section.tsx`**: Selected work section container with `HolographicDisc` and `ProjectSlider`.
- **`music-lab-section/music-lab-section.tsx`**: Music lab teaser with `AcousticWaveform`.
- **`experience-section/experience-section.tsx`**: Career journey timeline.
- **`skills-section/skills-section.tsx`**: Skills categories and `ToolsGrid`.
- **`about-section/about-section.tsx`**: Personal bio and `ResonanceGyroscope`.
- **`contact-section/contact-section.tsx`**: Direct contact methods, WhatsApp link, and `SignalBeacon`.

### 5. `src/hooks/` — Custom Hooks
- **`use-stage-scroll/use-stage-scroll.ts`**:
  - Normalized scroll tracker (`0.0` to `1.0`) driving the 3D stage dispersion without triggering React component re-renders.
- **`use-active-section/use-active-section.ts`**:
  - Highlight tracker for the active navigation menu item as you scroll through sections.

---

## How to Edit Colors & Styling

- **Primary Colors (`src/app/globals.css`)**:
  - Background: `#0B0C10` (`--background`)
  - Lilac Accent: `#A78BFA` (`--accent`)
  - Cyan Secondary Accent: `#67E8F9` (`--accent-secondary`)
  - Surface Glass: `rgba(255, 255, 255, 0.04)` with `backdrop-filter: blur(16px)`
- **Tailwind Tokens**:
  - Configured via Tailwind CSS v4 in `src/app/globals.css`.
