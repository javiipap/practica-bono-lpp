import { ReactElement, useState } from 'react';
import { ErrorContext } from '@context/index';
import { hashCode } from '@utils/index';
import styles from './styles.module.scss';

export interface Props {
  children: ReactElement;
}
export type ErrorType = 'warning' | 'error';

interface Notification {
  id: number;
  type: ErrorType;
  text: string;
  unmount?: boolean;
}

export default function ErrorPrompt({ children }: Props) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const pushError = (type: ErrorType, text: string) => {
    let id: number;
    setNotifications((ntfs) => {
      id = !!ntfs.length ? ntfs[ntfs.length - 1].id + 1 : 0;
      return [...ntfs, { id, type, text }];
    });

    if (notifications.length >= 4) {
      // Se aplica la clase exit al elemento
      setNotifications((ntfs) =>
        ntfs.map((val, i) => (!!i ? val : { ...val, unmount: true }))
      );
      // Tras la animación de exit se elimina del DOM
      setTimeout(() => setNotifications((ntfs) => ntfs.slice(1)), 600);
    }

    setTimeout(() => {
      // Se aplica la clase exit al elemento
      setNotifications((ntfs) =>
        ntfs.map((val) => (val.id !== id ? val : { ...val, unmount: true }))
      );
      // Tras la animación de exit se elimina del DOM
      setTimeout(
        () => setNotifications((ntfs) => ntfs.filter((val) => val.id !== id)),
        600
      );
    }, 5000);
  };

  return (
    <>
      <ErrorContext.Provider value={pushError}>
        {children}
      </ErrorContext.Provider>
      <div className={styles.errorWrapper}>
        {notifications.map(({ type, text, unmount, id }) => (
          <div
            className={`${styles.errorPrompt} ${unmount ? styles.exit : ''}`}
            key={`ntf-${id}_${hashCode(text)}`}
          >
            <p className={type === 'error' ? styles.red : styles.yellow}>
              {text}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
