import Grid from '@components/Grid';
import getNext, { convertToInteger } from '@utils/getNext';
import Link from 'next/link';
import { CellType, RawData } from 'types';
import styles from '@styles/level.module.scss';
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Success from '@components/Success';

const mockData: { [key: string]: RawData } = {
  b3JlbSBp: {
    dimensions: {
      cols: 10,
      rows: 10,
    },
    start: [0, 0],
    end: [7, 7],
    obstacles: [
      { position: [0, 5], type: CellType.wall },
      { position: [1, 5], type: CellType.wall },
      { position: [2, 5], type: CellType.wall },
      { position: [3, 5], type: CellType.wall },
      { position: [5, 7], type: CellType.wall },
      { position: [5, 8], type: CellType.wall },
      { position: [5, 9], type: CellType.wall },
      { position: [7, 5], type: CellType.wall },
      { position: [8, 5], type: CellType.wall },
      { position: [9, 5], type: CellType.wall },
      { position: [5, 0], type: CellType.wall },
      { position: [5, 1], type: CellType.wall },
      { position: [5, 2], type: CellType.wall },
      { position: [5, 3], type: CellType.wall },
      { position: [5, 6], type: CellType.void },
      { position: [6, 4], type: CellType.enemy },
    ],
  },
  cHN1bSBk: {
    dimensions: {
      cols: 10,
      rows: 10,
    },
    start: [0, 0],
    end: [7, 8],
    obstacles: [
      { position: [7, 4], type: CellType.wall },
      { position: [7, 5], type: CellType.wall },
      { position: [8, 4], type: CellType.wall },
      { position: [8, 5], type: CellType.wall },
      { position: [2, 0], type: CellType.wall },
      { position: [2, 1], type: CellType.wall },
      { position: [2, 2], type: CellType.wall },
      { position: [2, 3], type: CellType.wall },
      { position: [2, 4], type: CellType.wall },
      { position: [2, 5], type: CellType.wall },
      { position: [2, 6], type: CellType.wall },
      { position: [2, 7], type: CellType.wall },
      { position: [5, 1], type: CellType.wall },
      { position: [5, 2], type: CellType.wall },
      { position: [5, 3], type: CellType.wall },
      { position: [5, 4], type: CellType.wall },
      { position: [5, 5], type: CellType.wall },
      { position: [5, 6], type: CellType.wall },
      { position: [5, 7], type: CellType.wall },
      { position: [0, 1], type: CellType.void },
      { position: [1, 5], type: CellType.void },
      { position: [4, 5], type: CellType.void },
      { position: [6, 9], type: CellType.void },
      { position: [7, 9], type: CellType.void },
      { position: [8, 9], type: CellType.void },
      { position: [9, 9], type: CellType.void },
      { position: [6, 8], type: CellType.void },
      { position: [9, 8], type: CellType.void },
      { position: [5, 9], type: CellType.enemy },
      { position: [6, 7], type: CellType.enemy },
      { position: [9, 7], type: CellType.enemy },
    ],
  },
  b2xvciBz: {
    dimensions: {
      cols: 10,
      rows: 10,
    },
    start: [0, 0],
    end: [9, 6],
    obstacles: [
      { position: [0, 0], type: CellType.void },
      { position: [1, 1], type: CellType.enemy },
      { position: [1, 2], type: CellType.enemy },
      { position: [1, 5], type: CellType.void },
      { position: [1, 7], type: CellType.void },
      { position: [1, 8], type: CellType.void },
      { position: [2, 2], type: CellType.wall },
      { position: [2, 3], type: CellType.wall },
      { position: [2, 5], type: CellType.wall },
      { position: [2, 6], type: CellType.wall },
      { position: [3, 1], type: CellType.wall },
      { position: [3, 2], type: CellType.wall },
      { position: [3, 3], type: CellType.wall },
      { position: [3, 5], type: CellType.wall },
      { position: [3, 6], type: CellType.wall },
      { position: [3, 7], type: CellType.wall },
      { position: [3, 9], type: CellType.void },
      { position: [4, 1], type: CellType.wall },
      { position: [4, 2], type: CellType.wall },
      { position: [4, 5], type: CellType.void },
      { position: [4, 6], type: CellType.wall },
      { position: [4, 7], type: CellType.wall },
      { position: [5, 3], type: CellType.void },
      { position: [5, 8], type: CellType.enemy },
      { position: [6, 1], type: CellType.wall },
      { position: [6, 2], type: CellType.wall },
      { position: [6, 6], type: CellType.wall },
      { position: [6, 7], type: CellType.wall },
      { position: [7, 1], type: CellType.wall },
      { position: [7, 2], type: CellType.wall },
      { position: [7, 3], type: CellType.wall },
      { position: [7, 5], type: CellType.wall },
      { position: [7, 6], type: CellType.wall },
      { position: [7, 7], type: CellType.wall },
      { position: [7, 9], type: CellType.void },
      { position: [8, 2], type: CellType.wall },
      { position: [8, 3], type: CellType.wall },
      { position: [8, 4], type: CellType.void },
      { position: [8, 5], type: CellType.wall },
      { position: [8, 6], type: CellType.wall },
      { position: [9, 0], type: CellType.enemy },
      { position: [9, 8], type: CellType.enemy },
      { position: [9, 9], type: CellType.void },
    ],
  },
};

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
      <h1>Nivel {convertToInteger(uid)}</h1>
      {data !== undefined ? (
        <Grid data={data} onSuccess={() => setDone(true)} />
      ) : (
        ''
      )}

      <div className={styles.buttons}>
        {getNext(uid, true) ? (
          <Link href={`/levels/${getNext(uid, true)}`}>
            {'<-'} Anterior nivel
          </Link>
        ) : (
          <Link href={`/`}>{'<-'} Inicio</Link>
        )}
        {done ? (
          getNext(uid) ? (
            <Link href={`/levels/${getNext(uid)}`}>Siuiente nivel {'->'}</Link>
          ) : (
            <Link href={`/done`}>Acabar!! {'->'}</Link>
          )
        ) : (
          ''
        )}
      </div>
      <Success mount={done} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      rawData: mockData[params!.uid as string],
      uid: params!.uid,
    },
  };
};
