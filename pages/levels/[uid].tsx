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
    end: [9, 6],
    obstacles: [
      { position: [1, 5], type: CellType.wall },
      { position: [1, 6], type: CellType.wall },
    ],
  },
  cHN1bSBk: {
    dimensions: {
      cols: 10,
      rows: 10,
    },
    start: [0, 0],
    end: [9, 9],
    obstacles: [
      { position: [1, 5], type: CellType.wall },
      { position: [1, 6], type: CellType.wall },
      { position: [1, 7], type: CellType.wall },
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
      { position: [1, 5], type: CellType.wall },
      { position: [1, 6], type: CellType.wall },
    ],
  },
  aXQgYW1l: {
    dimensions: {
      cols: 10,
      rows: 10,
    },
    start: [0, 0],
    end: [9, 6],
    obstacles: [
      { position: [1, 5], type: CellType.wall },
      { position: [1, 6], type: CellType.wall },
    ],
  },
  dCwgY29u: {
    dimensions: {
      cols: 10,
      rows: 10,
    },
    start: [0, 0],
    end: [9, 6],
    obstacles: [
      { position: [1, 5], type: CellType.wall },
      { position: [1, 6], type: CellType.wall },
    ],
  },
  c2VjdGV0: {
    dimensions: {
      cols: 10,
      rows: 10,
    },
    start: [0, 0],
    end: [9, 6],
    obstacles: [
      { position: [1, 5], type: CellType.wall },
      { position: [1, 6], type: CellType.wall },
    ],
  },
  dXIgYWRp: {
    dimensions: {
      cols: 10,
      rows: 10,
    },
    start: [0, 0],
    end: [9, 6],
    obstacles: [
      { position: [1, 5], type: CellType.wall },
      { position: [1, 6], type: CellType.wall },
    ],
  },
  cGlzY2lu: {
    dimensions: {
      cols: 10,
      rows: 10,
    },
    start: [0, 0],
    end: [9, 6],
    obstacles: [
      { position: [1, 5], type: CellType.wall },
      { position: [1, 6], type: CellType.wall },
    ],
  },
  ZyBlbGl0: {
    dimensions: {
      cols: 10,
      rows: 10,
    },
    start: [0, 0],
    end: [9, 6],
    obstacles: [
      { position: [1, 5], type: CellType.wall },
      { position: [1, 6], type: CellType.wall },
    ],
  },
  LiBOdWxs: {
    dimensions: {
      cols: 10,
      rows: 10,
    },
    start: [0, 0],
    end: [9, 6],
    obstacles: [
      { position: [1, 5], type: CellType.wall },
      { position: [1, 6], type: CellType.wall },
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
