import React, { useContext, useRef, useState } from 'react';
import Cell from '@components/Cell';
import Player from '@components/Player';
import Prompt, { State } from '@components/Prompt';
import { ErrorContext } from '@context/index';
import { ICell, RawData, CellType, Side, Position } from 'types/index';
import { sleep } from '@utils/index';

const mockData: RawData = {
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
};

const computePos =
  (cols: number, rows: number) =>
  ([row, col]: number[]) => {
    if (row < 0 || col < 0 || row >= rows || col >= cols) return cols * rows;
    return row * cols + col;
  };

const parseData = (data: RawData): ICell[] => {
  const getPos = computePos(mockData.dimensions.cols, mockData.dimensions.rows);

  const parsed: ICell[] = [
    ...new Array(data.dimensions.cols * data.dimensions.rows),
  ].map(() => ({
    background: 'white',
    type: CellType.empty,
  }));

  parsed[getPos(data.start)].background = 'green';
  parsed[getPos(data.end)].background = 'red';

  // Cargar las paredes
  for (const ob of data.obstacles) {
    parsed[getPos(ob.position)] = {
      background: 'black', // TODO
      type: ob.type,
    };
  }

  return parsed;
};

export default function Home() {
  const getPos = computePos(mockData.dimensions.cols, mockData.dimensions.rows);
  const cells = useRef(parseData(mockData));
  const [playerPosition, setPlayerPosition] = useState(mockData.start);
  const [promptVisible, setPromptVisible] = useState(false);

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

  const getTransitionState = (position: Position): CellType => {
    if (cells.current[getPos(position)] === undefined) {
      return CellType.outOfBound;
    }

    return cells.current[getPos(position)].type;
  };

  const promptSubmit = async (state?: State) => {
    setPromptVisible(false);

    if (state === undefined) {
      sideToMove.current = undefined;
      return;
    }

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

      positions.push({ type: getTransitionState(position!), position });
      if (positions[positions.length - 1].type !== CellType.empty) break;
    }

    for (const pos of positions) {
      if (pos.type !== CellType.empty) {
        if (pos.type === state.loopCondition) return;
        console.info(`Error al moverse de tipo: ${pos.type}`);
        switch (pos.type) {
          case CellType.wall:
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
        setPlayerPosition([0, 0]);
        return;
      }

      setPlayerPosition(pos.position!);
      await sleep(200);
    }
  };

  return (
    <div className="main">
      <div className="wrap">
        <div className="center">
          <div className="grid_wrapper">
            <div
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${mockData.dimensions.cols}, 48px)`,
              }}
            >
              {cells.current.map(({ background }, i) => (
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
  );
}
