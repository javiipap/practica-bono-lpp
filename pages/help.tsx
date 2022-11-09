import styles from '@styles/help.module.scss';
import Link from 'next/link';

export default function Help() {
  return (
    <div className={styles.help}>
      <Link href="/">Volver al inicio</Link>
      <div className={styles.content}>
        <div className={styles.bg}></div>
        <div className={styles.card}>
          <h2>WHILE</h2>
          <div className={styles.code_block}>
            <span>{'while (condition == true) {}'}</span>
          </div>
          <div className={styles.desc}>
            <p>
              El bucle while o bucle mientras es un ciclo repetitivo basado en
              los resultados de una expresión lógica; se encuentra en la mayoría
              de los lenguajes de programación estructurados. El propósito es
              repetir un bloque de código mientras una condición se mantenga
              verdadera.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <h2>FOR</h2>
          <div className={styles.code_block}>
            <span>{'for (int i = 0; i < 10; i++) {}'}</span>
          </div>
          <div className={styles.desc}>
            <p>
              El bucle for es una estructura de control en programación en la
              que se puede indicar de antemano el número máximo de iteraciones.
            </p>
            <h4>Elementos: </h4>
            <hr />
            <div className={styles.code_block}>
              <span>(inicialización; condición de control; incremento)</span>
            </div>
            <ul>
              <li>
                Inicialización: Aquí se inicializa la variable que llevará la
                cuenta de las iteraciones del bucle.
              </li>
              <li>
                Condición de control: Condición que hará que el bucle pare
                (Igual que la condición de parada de un bucle while).
              </li>
              <li>Incremento: Cuánto sumarle a la variable de control.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
