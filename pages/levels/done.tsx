import styles from '@styles/done.module.scss';

export default function Done() {
  return (
    <div className={`${styles.done} center`}>
      <div className={styles.bg}></div>
      <div className={styles.text}>
        <h1>FELICIDADES!!</h1>
        <hr />
        <p>Ya controlas los bucles como un programador</p>
      </div>
    </div>
  );
}
