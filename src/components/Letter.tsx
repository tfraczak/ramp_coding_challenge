import React, { CSSProperties } from 'react';
import { classNameBuilder } from '@helpers';
import { COLORS } from '@constants';

type Props = { letter: string };

const Letter = ({ letter }: Props): JSX.Element => {
  const color = COLORS[Math.floor(COLORS.length * Math.random())];
  const backgroundColor = 'rgb(222, 197, 129)';
  const liStyle: CSSProperties = {
    backgroundColor,
    borderColor: color,
  };
  return (
    <li
      className={classNameBuilder('letter-list-item')}
      style={liStyle}
    >
      <h3 className={classNameBuilder('letter')} style={{ color }}>{letter.toUpperCase()}</h3>
    </li>
  );
};

export default Letter;