import styles from '@styles/home.module.scss';
import getNext from '@utils/getNext';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.bg}></div>
      <h1>Sabes cómo funcionan los bucles?</h1>
      <div className={styles.overlay}></div>
      <div className={styles.buttons}>
        <Link href={`/levels/${getNext()}`}>Vamos a ver si es verdad</Link>
        <Link href={'/help'}>Aún tienes dudas?</Link>
      </div>
    </div>
  );
}
