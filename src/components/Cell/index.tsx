import React from 'react';

export interface Props {
  id: number;
  background: string;
}

export default function Cell({ id, background }: Props) {
  return <div className="" style={{ background }}></div>;
}
