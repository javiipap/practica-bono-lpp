import React, { ChangeEvent, useRef, useState } from 'react';
import { useEffect } from 'react';
import { Position, CellType } from 'types';
import styles from './styles.module.scss';

export interface Props {
  position: Position;
  submit: (state?: State) => void;
}

export interface State {
  type: string;
  loopCondition: string | number;
}

export default function Prompt({ position, submit }: Props) {
  const [slide, setSlide] = useState(0);
  const [state, setState] = useState<State>({
    type: '',
    loopCondition: '',
  });

  const overlayRef = useRef<HTMLDivElement>(null);

  const updateState = (e: ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const selectType = (type: string, nextSlide: number) => () => {
    setState((prev) => ({ ...prev, type }));
    setSlide(nextSlide);
  };

  const validateState = () => {
    if (state.type === 'for') {
      return !isNaN(parseInt(state.loopCondition as string));
    }

    if (Object.values(CellType).includes(state.loopCondition as CellType))
      return true;
    return false;
  };

  useEffect(() => {
    const keyDownHandler = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Enter' && validateState()) {
        submit(state);
      } else if (e.key === 'Escape') {
        submit();
      }
    };

    document.addEventListener('keydown', keyDownHandler);
    return () => document.removeEventListener('keydown', keyDownHandler);
    // eslint-disable-next-line
  }, [state]);

  return (
    <>
      <div
        className={styles.overlay}
        ref={overlayRef}
        onClick={() => submit()}
      ></div>
      <div
        className={styles.prompt}
        style={{
          top: position[0] * 48 + 47,
          left: position[1] * 48 + 47,
        }}
      >
        <div>
          {slide === 0 ? (
            <div>
              <h2>TIPO DE BUCLE</h2>
              <hr />
              <div className={styles.card}>
                <p
                  onClick={selectType('for', 1)}
                >{`for (int i = 0; i < ?; i++)`}</p>
                <p onClick={selectType('while', 2)}>while (condition)</p>
              </div>
            </div>
          ) : (
            <>
              <svg viewBox="0 0 384 512" onClick={() => setSlide(0)}>
                <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
              </svg>
              <div>
                <h2>
                  {slide === 1
                    ? 'NÚMERO DE ITERACIONES'
                    : 'CONDICIÓN DE PARADA'}
                </h2>
                <hr />
                {slide === 1 ? (
                  <input
                    type="number"
                    name="loopCondition"
                    value={state.loopCondition}
                    onChange={updateState}
                    autoFocus
                    autoComplete="off"
                  />
                ) : (
                  <div className={styles.options}>
                    {Object.values(CellType)
                      .filter(
                        (type) =>
                          type !== CellType.void && type !== CellType.empty
                      )

                      .map((val, i) => (
                        <p
                          className={
                            state.loopCondition === val ? styles.selected : ''
                          }
                          onClick={() =>
                            setState((prev) => ({
                              ...prev,
                              loopCondition: val,
                            }))
                          }
                          key={`stop_opt-${i}`}
                        >
                          {val}
                        </p>
                      ))}
                  </div>
                )}
                <div
                  className={`${styles.submit} ${
                    validateState() ? '' : styles.disabled
                  }`}
                  onClick={() => validateState() && submit(state)}
                >
                  Guardar
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
