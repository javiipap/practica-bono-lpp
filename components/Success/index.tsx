import { sleep } from '@utils/index';
import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';

export interface Props {
  mount: boolean;
}

export default function Success({ mount }: Props) {
  const [isMounted, setIsMounted] = useState(true);
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMount = async () => {
      await sleep(2000);
      el.current?.classList.add(styles.exit);
      await sleep(1000);
      isMounted && el.current?.classList.remove(styles.exit);
    };

    if (mount) handleMount();
    // eslint-disable-next-line
  }, [mount]);

  useEffect(() => {
    return () => setIsMounted(false);
  }, []);

  return mount ? (
    <div className={styles.success} ref={el}>
      <div className={styles.content}>
        <h2>BRAVO!!</h2>
        <p>Has completado el nivel. Ya puedes pasar al siguiente</p>
      </div>
    </div>
  ) : (
    <></>
  );
}
