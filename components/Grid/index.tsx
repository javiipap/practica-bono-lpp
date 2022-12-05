import React, { useContext, useEffect, useRef, useState } from 'react';
import Cell from '@components/Cell';
import Player from '@components/Player';
import Prompt, { State } from '@components/Prompt';
import { ErrorContext } from '@context/index';
import { sleep, getBG } from '@utils/index';
import styles from './styles.module.scss';
import { CellType } from 'types';
import { convertToInteger } from '@utils/getNext';

const computePos =
  (cols: number, rows: number) =>
  ([row, col]: number[]) => {
    if (row < 0 || col < 0 || row >= rows || col >= cols) return cols * rows;
    return row * cols + col;
  };

const parseData = (data: RawData): ICell[] => {
  const getPos = computePos(data.dimensions.cols, data.dimensions.rows);

  const parsed: ICell[] = [
    ...new Array(data.dimensions.cols * data.dimensions.rows),
  ].map(() => ({
    background: 'url("/empty.png")',
    type: CellType.empty,
  }));

  parsed[getPos(data.start)].background = 'url("/empty.png")';
  parsed[getPos(data.end)].background = 'url("/end.png")';

  // Cargar las paredes
  for (const ob of data.obstacles) {
    parsed[getPos(ob.position)] = {
      background: getBG(ob.type),
      type: ob.type,
    };
  }

  return parsed;
};

export interface Props {
  data: RawData;
  onSuccess: () => void;
  uid: string;
}

export default function Grid({ data, onSuccess, uid }: Props) {
  const getPos = computePos(data.dimensions.cols, data.dimensions.rows);
  const [cells, setCells] = useState(parseData(data));
  const [playerPosition, setPlayerPosition] = useState(data.start);
  const [promptVisible, setPromptVisible] = useState(false);
  const localState = useRef<LocalStorage>();

  useEffect(() => {
    setCells(parseData(data));
    setPlayerPosition(data.start);
  }, [data]);

  useEffect(() => {
    if (convertToInteger(uid) === 1) {
      localStorage.clear();
    }

    localState.current = {
      steps: parseInt(localStorage.getItem('steps') ?? '0'),
      iterations: parseInt(localStorage.getItem('iterations') ?? '0'),
      deaths: parseInt(localStorage.getItem('deaths') ?? '0'),
      hits: parseInt(localStorage.getItem('hits') ?? '0'),
      levels: parseInt(localStorage.getItem('levels') ?? '0'),
    };
  }, []);

  const pushError = useContext(ErrorContext);

  const sideToMove = useRef<Side>(undefined);

  const nextPos = (side: Side, position: Position): Position | undefined => {
    switch (side) {
      case 'up':
        return [position[0] - 1, position[1]];
      case 'right':
        return [position[0], position[1] + 1];
      case 'down':
        return [position[0] + 1, position[1]];
      case 'left':
        return [position[0], position[1] - 1];
    }
  };

  const saveState = () => {
    Object.keys(localState.current!).forEach((key) => {
      localStorage.setItem(
        key,
        localState.current![key as keyof LocalStorage].toString()
      );
    });
  };

  const getTransitionState = (position: Position): CellType => {
    if (cells[getPos(position)] === undefined) {
      return CellType.outOfBound;
    }

    return cells[getPos(position)].type;
  };

  const promptSubmit = async (state?: State) => {
    setPromptVisible(false);

    if (state === undefined) {
      sideToMove.current = undefined;
      return;
    }

    localState.current!.steps++;

    // calcular traza
    const positions: { position?: Position; type: CellType }[] = [];
    let i = 0;
    while (
      (state.type === 'for' && i++ < state.loopCondition) ||
      state.type === 'while'
    ) {
      const position = nextPos(
        sideToMove.current,
        positions[positions.length - 1]?.position || playerPosition
      );

      // Si se ha llegado a la condición de parada hacer break.
      if (
        state.type === 'while' &&
        getTransitionState(position!) === state.loopCondition
      )
        break;

      positions.push({ type: getTransitionState(position!), position });

      // Si se encuentra un bloque no vacío hacer break para evitar bucles infinitos.
      if (getTransitionState(position!) !== CellType.empty) break;
    }

    for (const pos of positions) {
      localState.current!.iterations++;

      if (pos.type !== CellType.empty) {
        if (pos.type === state.loopCondition) break;
        switch (pos.type) {
          case CellType.wall:
            localState.current!.hits++;
            saveState();
            pushError('warning', 'Cuidado te has topado con una pared!!');
            return;
          case CellType.void:
            pushError('error', 'Te has caído por un hueco!!');
            break;
          case CellType.outOfBound:
            pushError('error', 'Te has salido del mapa!!');
            break;
          case CellType.enemy:
            pushError('error', 'Cuidado con los enemigos!!');
            break;
        }
        localState.current!.deaths++;
        saveState();
        setPlayerPosition(data.start);
        return;
      }

      saveState();
      setPlayerPosition(pos.position!);
      await sleep(200);
    }

    if (
      JSON.stringify(positions[positions.length - 1].position) ===
      JSON.stringify(data.end)
    ) {
      localState.current!.levels++;
      saveState();
      onSuccess();
    }
  };

  return (
    <div className="main">
      <div className="wrap">
        <div className="center">
          <div className={`${styles.grid_wrapper} center`}>
            <div className={styles.container}>
              <div
                className={styles.grid}
                style={{
                  gridTemplateColumns: `repeat(${data.dimensions.cols}, 48px)`,
                }}
              >
                {cells.map(({ background }, i) => (
                  <Cell key={`cell-${i}`} id={i} background={background} />
                ))}
              </div>
              <Player
                position={playerPosition}
                move={(side: Side) => () => {
                  sideToMove.current = side;
                  setPromptVisible(true);
                }}
              />
              {promptVisible ? (
                <Prompt position={playerPosition} submit={promptSubmit} />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
