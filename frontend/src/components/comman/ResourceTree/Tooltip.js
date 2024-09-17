import React from 'react';
import {Spring, animated} from 'react-spring';
import {NODE_HEIGHT} from '../utils';

const Tooltip = ({x, value}) => (
  <Spring native from={{opacity: 0}} to={{opacity: 1}}>
    {({opacity}) => (
      <animated.g
        className="pointer-events-none drop-shadow-md "
        style={{opacity}}
        transform={`translate(${x}, 0)`}>
        <line y2={NODE_HEIGHT} className="stroke-2 stroke-gray-900" />
        <rect
          rx="6"
          ry="6"
          x="-15"
          y="-16"
          width="30"
          height="20"
          className="fill-gray-900"
        />
        <text
          y="-2"
          className="fill-white text-xs font-mono"
          style={{textAnchor: 'middle'}}>
          {Math.round(value)}
        </text>
      </animated.g>
    )}
  </Spring>
);

export default Tooltip;
