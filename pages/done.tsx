import styles from '@styles/done.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import mockData, { MAX_LEVELS } from 'res/mockData';

export default function Done() {
  const [state, setState] = useState<LocalStorage | undefined>(undefined);
  useEffect(() => {
    setState({
      steps: parseInt(localStorage.getItem('steps') ?? '0'),
      iterations: parseInt(localStorage.getItem('iterations') ?? '0'),
      deaths: parseInt(localStorage.getItem('deaths') ?? '0'),
      hits: parseInt(localStorage.getItem('hits') ?? '0'),
      levels: parseInt(localStorage.getItem('levels') ?? '0'),
    });
  }, []);

  return (
    <div className={`${styles.done} center`}>
      {typeof state?.levels === 'number' && state.levels < MAX_LEVELS ? (
        <Link href={'/levels/' + Object.keys(mockData)[state.levels]}>
          Seguir jugando
        </Link>
      ) : (
        <Link href="/">Inicio</Link>
      )}
      <div className={styles.bg}></div>
      <div className={styles.text}>
        <h1>FELICIDADES!!</h1>
        <hr />
        <p>Ya controlas los bucles como un programador</p>
        <div className={styles.stats}>
          <h2>Qué tal lo has hecho...</h2>
          <div className={styles.elts}>
            <div>
              <p>Decisiones: {state?.steps}</p>
            </div>
            <div>
              <p>Pasos: {state?.iterations}</p>
            </div>
            <div>
              <p>Muertes: {state?.deaths}</p>
            </div>
            <div>
              <p>Golpes: {state?.hits}</p>
            </div>
            <div>
              <p>Niveles: {state?.levels}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
