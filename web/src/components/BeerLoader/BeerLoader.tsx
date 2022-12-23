import { BeerLoaderModel } from '../../models/BeerLoader.model';
import styles from './BeerLoader.module.scss'

export function BeerLoader(props: BeerLoaderModel) {

  /*- set dfault component options -*/
  const defaultOptions: BeerLoaderModel = {
    boxWidth: '100px',
    boxHeight: '100px',
    strokeColor: '#fff'
  }

  /*- Merge received options with default -*/
  const opts = { ...defaultOptions, ...props }

  return (
    <div className={styles.loaderBox} style={{ width: opts.boxWidth, height: opts.boxHeight }}>
      <div className={styles.beer}>

        <div className={styles.cup} style={{ borderColor: opts.strokeColor }}>
          <div className={styles.liquid}></div>
          <div className={`${styles.stripe} ${styles.st1}`} style={{ background: opts.strokeColor }}></div>
          <div className={`${styles.stripe} ${styles.st2}`} style={{ background: opts.strokeColor }}></div>
          <div className={`${styles.stripe} ${styles.st3}`} style={{ background: opts.strokeColor }}></div>
        </div>

        <div className={styles.cupHolder} style={{ borderColor: opts.strokeColor }}></div>

        <div className={styles.foamContainer}>
          <div className={`${styles.foam} ${styles.f1}`} style={{ borderColor: opts.strokeColor }}></div>
          <div className={`${styles.foam} ${styles.f2}`} style={{ borderColor: opts.strokeColor }}></div>
          <div className={`${styles.foam} ${styles.f3}`} style={{ borderColor: opts.strokeColor }}></div>
        </div>

        <div className={`${styles.bubble} ${styles.b1}`} style={{ background: opts.strokeColor }}></div>
        <div className={`${styles.bubble} ${styles.b2}`} style={{ background: opts.strokeColor }}></div>
        <div className={`${styles.bubble} ${styles.b3}`} style={{ background: opts.strokeColor }}></div>

      </div>
    </div>
  )
}