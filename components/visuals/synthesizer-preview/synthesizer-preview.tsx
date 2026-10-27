import styles from './synthesizer-preview.module.css';

const blackKeyPositions = [1, 2, 4, 5, 6, 8, 9, 11, 12, 13];

export function SynthesizerPreview() {
  return (
    <figure className={styles.scene}>
      <div className={styles.halo} aria-hidden="true" />
      <div
        className={styles.instrument}
        role="img"
        aria-label="Illustration of a lilac-lit synthesizer with piano keys, control knobs, and a waveform display"
      >
        <div className={styles.console} aria-hidden="true">
          <div className={styles.brand}>
            VENSLY<span>.</span>
            <small>SYNTH / 01</small>
          </div>
          <div className={styles.display}>
            <svg viewBox="0 0 150 44" fill="none">
              <path d="M0 22h12l7-14 10 28 10-28 10 28 10-28 10 28 10-28 10 28 10-28 10 28 10-14h31" />
            </svg>
          </div>
          <div className={styles.knobs}>
            {[0, 1, 2].map(knob => (
              <span key={knob} />
            ))}
          </div>
        </div>
        <div className={styles.keybed} aria-hidden="true">
          {Array.from({ length: 14 }, (_, key) => (
            <span key={key} className={styles.whiteKey} />
          ))}
          {blackKeyPositions.map(position => (
            <span key={position} className={styles.blackKey} style={{ left: (position / 14) * 100 + '%' }} />
          ))}
        </div>
        <div className={styles.edge} aria-hidden="true">
          <span /> ENGINEERING × MUSIC
        </div>
      </div>
      <figcaption className={styles.caption}>
        <span /> A little music. A different perspective.
      </figcaption>
    </figure>
  );
}
