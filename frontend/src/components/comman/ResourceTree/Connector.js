import React from 'react';
import {motion} from 'framer-motion';

export default function Connector({
  connector: {x, y},
  selected,
  onClick,
  connecting,
  canConnect,
  resetConnectors,
  snap,
  unsnap,
}) {
  const onMouseOver = () => {
    if (canConnect) {
      setTimeout(() => snap());
    }
  };

  const onMouseLeave = () => {
    if (canConnect) {
      unsnap();
    }
  };

  let connectorClassName =
    'cursor-pointer transition fill-gray-300/70 opacity-0';
  if (canConnect) {
    connectorClassName += ' hover:opacity-100';
  }
  if (selected) {
    connectorClassName +=
      ' opacity-100 stroke-[6] stroke-emerald-500 fill-white drop-shadow-md scale-50';
  }
  if (canConnect && connecting) {
    connectorClassName += ' opacity-100';
  }

  return (
    <motion.g
      transition={{type: 'keyframes'}}
      initial={{x, y}}
      animate={{x, y}}>
      <circle r="4" className="fill-gray-100 stroke-2 stroke-gray-300" />
      <motion.circle
        transition={{type: 'keyframes'}}
        r={20}
        className={connectorClassName}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        onClick={({shiftKey}) => {
          if (canConnect) {
            onClick(shiftKey);
          } else {
            resetConnectors();
          }
        }}
      />
    </motion.g>
  );
}
