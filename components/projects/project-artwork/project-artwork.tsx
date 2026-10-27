import type { FeaturedProject } from '@/content/featured-projects';
import styles from './project-artwork.module.css';

type ProjectArtworkProps = { visual: FeaturedProject['visual'] };

export function ProjectArtwork({ visual }: ProjectArtworkProps) {
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
      <span className={styles.label}>PROJECT STUDY / {visual.toUpperCase()}</span>
    </div>
  );
}
