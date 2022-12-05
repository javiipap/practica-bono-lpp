import Grid from '@components/Grid';
import getNext, { convertToInteger } from '@utils/getNext';
import Link from 'next/link';
import styles from '@styles/level.module.scss';
import { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Success from '@components/Success';
import mockData from 'res/mockData';
import { sleep } from '@utils/index';

export interface Props {
  uid: string;
  rawData: RawData;
}

export default function Level({ rawData, uid }: Props) {
  const [done, setDone] = useState(false);
  const [data, setData] = useState(rawData);

  useEffect(() => {
    setData(rawData);
    setDone(false);
  }, [rawData]);

  return (
    <div className={styles.level}>
      <Link className={styles.help} href="/help">
        Ayuda
      </Link>
      <h1>Nivel {convertToInteger(uid)}</h1>
      {data !== undefined ? (
        <Grid data={data} onSuccess={() => setDone(true)} uid={uid} />
      ) : (
        ''
      )}
      <div className={styles.buttons}>
        <div className={styles.left}>
          {getNext(uid, true) ? (
            <Link href={`/levels/${getNext(uid, true)}`}>
              {'<-'} Anterior nivel
            </Link>
          ) : (
            <Link href={`/`}>{'<-'} Inicio</Link>
          )}
        </div>
        <div className={styles.right}>
          {done ? (
            getNext(uid) ? (
              <Link href={`/levels/${getNext(uid)}`}>
                Siguiente nivel {'->'}
              </Link>
            ) : (
              <Link href={`/done`}>Acabar!! {'->'}</Link>
            )
          ) : (
            ''
          )}
          <Link href="/done">Abandonar {':('}</Link>
        </div>
      </div>
      <Success mount={done} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.uid || !((params!.uid as string) in mockData)) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      rawData: (mockData as any)[params!.uid as string],
      uid: params!.uid,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(mockData).map((k) => ({ params: { uid: k } }));
  return { paths, fallback: 'blocking' };
};
