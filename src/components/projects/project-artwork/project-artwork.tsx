import Image from 'next/image';
import type { ProjectVisual } from '@/content/projects';
import styles from './project-artwork.module.css';

type ProjectArtworkProps = {
  visual: ProjectVisual;
  image?: string;
  title?: string;
};

export function ProjectArtwork({ visual, image, title }: ProjectArtworkProps) {
  if (image) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-black/40" aria-hidden="true">
        <Image
          src={image}
          alt={title ? `${title} interface preview` : 'Project interface'}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        {/* Ambient Dark-to-Glass Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1017] via-[#0e1017]/35 to-transparent pointer-events-none" />
        
        {/* Project Study Pill */}
        <div className="absolute top-2.5 left-3 z-10">
          <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/55 px-2.5 py-0.5 font-mono text-[9px] tracking-wider text-muted backdrop-blur-md shadow-sm">
            <span className="h-1 w-1 rounded-full bg-accent" />
            PROJECT STUDY / {visual.toUpperCase()}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.artwork + ' ' + styles[visual]} aria-hidden="true">
      {visual === 'music' && (
        <div className={styles.waveform}>
          {[20, 36, 57, 30, 75, 100, 66, 40, 86, 53, 29, 44, 18].map((height, index) => (
            <span key={index} style={{ height: height + '%' }} />
          ))}
        </div>
      )}
      {visual === 'records' && (
        <div className={styles.recordsStack}>
          {[0, 1, 2].map(record => (
            <div key={record} className={styles.record}>
              <i />
              <span />
              <span />
            </div>
          ))}
        </div>
      )}
      {visual === 'community' && (
        <div className={styles.communityMark}>
          <span />
          <span />
          <span />
          <span />
        </div>
      )}
      {visual === 'systems' && (
        <div className={styles.systemsGrid}>
          {[0, 1, 2, 3, 4, 5].map(node => (
            <div key={node} className={styles.systemsNode}>
              <span />
            </div>
          ))}
        </div>
      )}
      <span className={styles.label}>PROJECT STUDY / {visual.toUpperCase()}</span>
    </div>
  );
}
