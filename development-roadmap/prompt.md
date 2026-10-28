# VENSLY: THE CODE SYMPHONY

## 1. Project overview

You are a senior creative frontend engineer, Three.js developer, and interactive web experience designer.

I have an existing portfolio built with **Next.js, TypeScript, Tailwind CSS, Three.js / React Three Fiber**, and deployed or intended to be deployed on Vercel.

I want to redesign the existing 3D homepage experience into a cinematic, scroll-driven interactive scene called:

**VENSLY — THE CODE SYMPHONY**

The goal is to combine my professional identity as a full-stack software engineer with my passion for music.

### Visual reference

https://nuralislabs.com/

Study the reference website's 3D presentation, camera composition, movement, lighting, scroll interactions, and overall premium visual direction.

Use it only as creative inspiration. Do not reproduce its proprietary assets, models, code, branding, or exact layout.

The final implementation must have a unique **Music × Software Engineering** identity.

## 2. Important existing project constraints

Before making any changes:

1. Inspect the existing repository, dependencies, components, and design system.
2. Identify the current 3D keyboard implementation and scroll animations.
3. Preserve the current Next.js App Router architecture.
4. Preserve the existing navbar, logo, favicon, musical-note cursor, portfolio content, and routing unless changes are specifically necessary.
5. Reuse existing libraries where suitable rather than installing competing animation libraries.
6. Keep the existing dark premium color palette:
   - Background: `#0B0C10`
   - Primary purple: `#A78BFA`
   - Accent cyan: `#67E8F9`
   - Text: `#F4F4F7`
7. Do not implement backend services, databases, authentication, or contact APIs during this task.
8. Keep playable instruments inside the **Music Lab** page. The homepage must not become a playable piano.

Do not rewrite the entire application or delete working components unnecessarily.

## 3. Main creative concept — The Harmonic Stage

Replace the current large 3D keyboard hero with a futuristic **floating musical technology stage**.

The stage should appear as a high-quality cinematic 3D object in a dark, atmospheric environment.

### A. Floating stage platform

Build a circular futuristic performance stage featuring:

- Dark metallic construction.
- Multiple concentric rings.
- Glowing purple and cyan light strips.
- Subtle edge highlights.
- A central elevated platform.
- Slow ambient rotation.
- Small hovering geometric elements.
- Restrained environmental lighting and reflections.

The stage should feel like a premium creative technology installation, not a cartoon or colorful gaming environment.

### B. Harmonic Core

At the center of the stage, place a floating abstract sculpture representing the combination of music and code.

The core could incorporate:

- A three-dimensional audio waveform.
- Curved musical staff lines.
- Floating musical notes.
- Interwoven geometric ribbons.
- A subtle digital wireframe.
- Small orbiting code-inspired symbols.
- Soft emissive lighting.

The composition should be visually distinctive and recognizable even when the animation is paused.

### C. Code-inspired environment

Create a restrained technical atmosphere surrounding the stage.

Possible elements:

- Translucent holographic panels.
- Small floating code brackets such as `{ }`, `</>` and `=>`.
- Thin animated signal lines.
- Small modular geometric blocks.
- Subtle particle networks.
- Technical grid patterns.

Avoid excessive random floating text or distracting decorative objects.

**The entire scene must communicate music and software engineering through its shape, structure, and motion.**

## 4. Homepage layout

Retain the existing professional hero text:

**Engineering ideas in rhythm.**

The initial desktop composition should be:

- Left: Hero title, introduction and calls to action.
- Right: Interactive 3D Harmonic Stage.
- Background: Near-black with subtle purple and cyan atmospheric lighting.

The 3D scene must not obscure the headline, buttons, navigation or body text.

The scene can extend outside its initial visual region during controlled scroll transitions, but it must never block normal page interaction.

Use actual HTML for portfolio content. Do not render important professional information as 3D text.

## 5. Scroll-driven animation experience

The main experience should use native browser scrolling, with animations mapped continuously to scroll progress.

Use GSAP ScrollTrigger where appropriate, coordinated with React Three Fiber. If the project already uses a suitable scroll animation system, assess whether it can be reused.

Do not create a separate scroll container unless absolutely necessary.

### Scroll state 1 — Hero introduction

At the top of the page:

- The stage is fully assembled.
- The Harmonic Core floats above the platform.
- Concentric rings slowly rotate.
- Small particles drift subtly.
- The camera presents an attractive three-quarter view.
- Hero text remains clearly visible.

### Scroll state 2 — Stage activation

As the user scrolls:

- The camera moves slightly closer.
- The stage rotates gently.
- Glowing rings separate vertically.
- Soundwave elements begin moving outward.
- Lighting intensity changes subtly.
- The hero content transitions naturally toward the next section.

### Scroll state 3 — Music meets code

During the technology section:

- The Harmonic Core gradually disperses.
- Musical notes and digital geometric fragments separate in 3D.
- Some elements travel upward or outward.
- Technology-related shapes become more visible.
- The camera reveals a new perspective.
- The technologies section appears in normal HTML.

Highlight relevant technologies from the existing portfolio, including Spring Boot, Angular, Go, Flutter, React, PostgreSQL, and other verified skills.

### Scroll state 4 — Projects transition

As the projects section approaches:

- The central stage moves away from the primary viewing area.
- Decorative particles and ribbons transition into smaller interstitial visuals.
- The actual project cards become the visual focus.
- Avoid covering cards or creating distracting movement while users read.

### Scroll state 5 — Music Lab transition

Near the Music Lab preview:

- Selected musical elements regroup into a compact visual.
- The Harmonic Core or a simplified waveform becomes visible again.
- A clear call to action invites users into the Music Lab.
- Instruments themselves remain on the dedicated Music Lab page.

### Reverse scrolling

Scrolling upward must reverse the state of the animation smoothly.

Animations should be deterministic and driven by normalized scroll progress wherever possible.

Avoid triggering irreversible particle explosions or restarting sequences every time the scroll direction changes.

## 6. Technical implementation

Preferred stack:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Three.js
- React Three Fiber
- Drei
- GSAP / ScrollTrigger, if appropriate

### Component architecture

Organize the implementation into maintainable components. Suggested structure:

```text
src/
  components/
    three/
      HarmonicStage.tsx
      StagePlatform.tsx
      HarmonicCore.tsx
      StageRings.tsx
      MusicParticles.tsx
      CodeElements.tsx
      StageLighting.tsx
      StageScene.tsx
    animations/
      useStageScroll.ts
    sections/
      HeroSection.tsx
      TechnologiesSection.tsx
      ProjectsSection.tsx
      MusicLabPreview.tsx
```

Adjust these paths to the actual repository structure rather than creating unnecessary duplicates.

### Technical requirements

- The 3D scene must be a Client Component.
- Use appropriate lazy loading and a loading fallback.
- Avoid multiple expensive WebGL canvases when one can handle the experience.
- Reuse geometry and materials where possible.
- Use instanced meshes for large numbers of repeated particles.
- Dispose of custom resources correctly.
- Clean up event listeners, animation timelines, and subscriptions.
- Avoid unnecessary React state updates every animation frame.
- Coordinate animation updates with the existing render loop.
- Avoid hydration errors and SSR crashes.
- Keep scroll progress synchronized with the 3D scene.
- Use semantic HTML for content and accessible links/buttons.

## 7. Responsive behavior

### Desktop

Full 3D cinematic experience with scroll-driven transformations.

### Tablet

Reduce geometry complexity, visual clutter, and camera movement. Preserve the hero layout and readable content.

### Mobile

Use a simpler scene or static visual fallback where necessary.

Do not sacrifice usability to maintain the complete desktop animation.

### Accessibility

- Respect `prefers-reduced-motion`.
- Keep keyboard navigation working.
- Ensure adequate text contrast.
- Avoid trapping scroll or pointer events.
- Do not autoplay audio.
- Preserve the existing accessible controls.
- Hide purely decorative 3D content from screen readers when appropriate.

### Performance

- Avoid excessive particle counts and draw calls.
- Prefer simple geometry before introducing complex external models.
- Keep the scene smooth on typical modern desktop and mobile hardware.
- Test actual responsiveness rather than assuming all devices can handle full-resolution rendering.
- Do not introduce heavy postprocessing without measuring its impact.
- Provide a graceful fallback if WebGL is unavailable.

## 8. Development phases

Implement this work incrementally.

### PHASE A — Floating stage foundation

Tasks:

1. Inspect the existing project.
2. Identify reusable components.
3. Create the stage geometry.
4. Add concentric rings and lighting.
5. Build the basic 3D camera composition.
6. Integrate the stage into the existing homepage hero.
7. Preserve the existing layout, content and navigation.

**Acceptance criteria:**

- The homepage displays a well-composed floating circular stage.
- Stage geometry and lighting match the existing website theme.
- The hero remains responsive and readable.
- No scroll dispersion yet.
- No broken routes or existing features.
- TypeScript, lint and production build pass.

Stop and request approval.

### PHASE B — Harmonic Core and music/code identity

Tasks:

1. Create the central Harmonic Core.
2. Add soundwave-inspired geometry.
3. Add floating musical elements.
4. Add restrained code-inspired decorative elements.
5. Introduce controlled ambient animation.
6. Refine stage materials and lighting.

**Acceptance criteria:**

- The stage visibly represents both music and software engineering.
- Ambient animations remain smooth.
- Scene objects are reusable and logically separated.
- The composition works without scroll animation.

Stop and request approval.

### PHASE C — Scroll choreography

Tasks:

1. Connect scene state to scroll progress.
2. Animate camera position and rotation.
3. Animate stage rings separating.
4. Implement reversible dispersion.
5. Coordinate transitions with homepage sections.
6. Handle scroll resizing and component cleanup.

**Acceptance criteria:**

- The stage responds smoothly to scrolling.
- Dispersion reverses when scrolling upward.
- The site retains normal browser scroll behavior.
- No sudden camera jumps or overlapping text.
- Reduced-motion fallback functions correctly.

Stop and request approval.

### PHASE D — Portfolio section integration

Tasks:

1. Connect the scene transitions with the technologies section.
2. Maintain the professional projects layout.
3. Add subtle 3D interstitial elements where appropriate.
4. Create a visual transition toward Music Lab.
5. Ensure the homepage tells a cohesive visual story.

**Acceptance criteria:**

- Technology and project content remains readable.
- 3D content supports the portfolio rather than dominating it.
- Music Lab remains the dedicated space for instruments.
- Responsive layouts are verified.

Stop and request approval.

### PHASE E — Production polish

Tasks:

1. Optimize geometries, materials, and particles.
2. Reduce unnecessary draw calls.
3. Improve loading and fallback behavior.
4. Validate mobile and tablet performance.
5. Check accessibility and reduced-motion behavior.
6. Run TypeScript, lint and production build.
7. Verify Vercel compatibility.
8. Prepare a final implementation summary.

**Acceptance criteria:**

- Stable production build.
- No critical console errors or hydration issues.
- Responsive hero across desktop and mobile.
- No broken navigation.
- Acceptable rendering performance.
- Existing functionality preserved.
- Ready for frontend deployment to Vercel.

## 9. Required workflow

For every phase:

1. Review the relevant existing code first.
2. Explain the implementation approach briefly.
3. Implement only the approved phase.
4. Run available checks.
5. Report files created and modified.
6. Explain important Next.js, React Three Fiber, and Three.js concepts so I can learn from the implementation.
7. Identify any remaining limitations or performance concerns.
8. Stop for my approval before continuing.

Do not automatically implement subsequent phases.

Do not replace the current website with a generic template.

Do not introduce unrelated features or a backend.

## 10. Final instruction

**START WITH PHASE A ONLY.**

First inspect the existing implementation and identify what needs to be preserved. Then implement the floating musical stage foundation in the current homepage.

Aim for a premium, original, polished 3D presentation.

After Phase A, provide a screenshot or visual verification if the environment supports it, summarize the changes, and stop for my review.
