import React from 'react';
import {line} from 'd3-shape';
import {motion} from 'framer-motion';

const lineGenerator = line()
  .x(p => p.x)
  .y(p => p.y);

export default function Link({link, isFirst}) {
  const path = lineGenerator(isFirst ? link.points.slice(1) : link.points);

  return (
    <motion.path
      fill="none"
      className="stroke-gray-300"
      strokeWidth="2"
      d={path}
      transition={{type: 'tween'}}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
    />
  );
}
