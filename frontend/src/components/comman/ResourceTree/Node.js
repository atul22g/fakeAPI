// import {Button, IconButton} from '../Button';
import {NODE_HEIGHT, NODE_WIDTH} from '../utils';
import React, {useEffect, useRef, useState} from 'react';
import {select} from 'd3-selection';
import {mouse as d3Mouse} from 'mouse';
import {event as d3Event} from 'event';

import Tooltip from './Tooltip';
import {motion} from 'framer-motion';
import {scaleLinear} from 'd3-scale';
import Button from '../Button/TextButton';
import IconButton from '../Button/IconButton';

const getWidth = scaleLinear([0, 100], [0, NODE_WIDTH - 2]);

export default function Node({
  node,
  isDemo,
  selected,
  projectId,
  onSelect,
  generateData,
  showEditResourceModal,
  showResourceDataModal,
  showDeleteResourceModal,
}) {
  const [tooltip, setTooltip] = useState(null);
  const hoverRect = useRef(null);
  useEffect(() => {
    if (!hoverRect.current) {
      return;
    }

    const onMousemove = () => {
      if (!hoverRect.current) {
        return;
      }

      let [x] = d3Mouse(hoverRect.current);
      let value = 0;

      if (x < 2) {
        x = 0;
        value = 0;
      } else if (x > NODE_WIDTH - 2) {
        x = NODE_WIDTH;
        value = 100;
      } else {
        value = Math.round(getWidth.invert(x));
      }

      setTooltip({x, value});
    };

    const onMouseleave = () => {
      setTooltip(null);
    };

    const onClick = () => {
      if (tooltip != null && node.count !== tooltip.value) {
        d3Event.stopPropagation();
        if (!selected) {
          onSelect();
        }
        generateData({
          projectId,
          resourceId: node.id,
          count: tooltip.value,
          prevCount: node.count,
          canGenerate: node.canGenerate,
        });
      }
    };

    select(hoverRect.current)
      .on('mousemove', onMousemove)
      .on('mouseleave', onMouseleave)
      .on('click', onClick);
  }, [tooltip, node, projectId, onSelect, generateData, selected]);

  const width = Math.round(getWidth(node.count));

  return (
    <motion.g
      className="group"
      transition={{type: 'keyframes'}}
      initial={{opacity: 0, x: node.x, y: node.y}}
      animate={{opacity: 1, x: node.x, y: node.y}}>
      {isDemo ? null : (
        <rect
          className={`fill-transparent transition-opacity ${
            selected
              ? 'stroke-gray-400 stroke-2 '
              : 'fill-transparent group-hover:stroke-gray-300 stroke-2'
          }`}
          rx="6"
          ry="6"
          x="-10"
          y="-20"
          strokeDasharray="4, 4"
          width={NODE_WIDTH * 2 + 80}
          height={NODE_HEIGHT + 25}
          onClick={event => {
            event.stopPropagation();
            onSelect();
          }}
        />
      )}
      <rect
        className="cursor-pointer fill-gray-200"
        ref={hoverRect}
        rx="6"
        ry="6"
        width={NODE_WIDTH}
        height={NODE_HEIGHT}
      />
      <motion.rect
        className="pointer-events-none"
        rx="5"
        ry="5"
        x="1"
        y="1"
        transition={{type: 'keyframes'}}
        initial={{width}}
        animate={{width}}
        height={NODE_HEIGHT - 2}
        fill="url(#bg)"
      />
      {isDemo ? (
        <text
          textAnchor="middle"
          className="text-fill-gray-900 font-mono font-medium text-sm"
          x={NODE_WIDTH / 2}
          dy="-5">
          {node.name}
        </text>
      ) : (
        <a
          href={node.mockUrl || '#'}
          target={node.mockUrl ? '_blank' : undefined}
          rel="noopener noreferrer">
          <text
            textAnchor="middle"
            className={`font-mono font-medium text-sm group-hover:fill-blue-700 ${
              selected ? 'fill-blue-700' : 'fill-gray-900'
            }`}
            x={NODE_WIDTH / 2}
            dy="-5">
            {node.name}
          </text>
        </a>
      )}
      <text
        style={{
          textShadow:
            '0.5px 0px white, 0px 0.5px white, 0px -0.5px white, -0.5px 0 white',
          textAnchor: 'middle',
        }}
        className="pointer-events-none text-sm font-semibold font-mono text-gray-900"
        x={NODE_WIDTH / 2}
        y={NODE_HEIGHT / 2 + 6}>
        {Math.round(getWidth.invert(width))}
      </text>
      {tooltip && <Tooltip {...tooltip} />}
      {isDemo ? null : (
        <foreignObject
          width="160"
          height="50"
          className={`${
            selected ? '' : 'opacity-0'
          } group-hover:opacity-100 overflow-visible`}
          x={NODE_WIDTH + 30}
          y={-4}>
          <div
            className="grid grid-cols-3 gap-1 p-1"
            xmlns="http://www.w3.org/2000/xhtml">
            <Button
              size="xs"
              transition={false}
              onClick={event => {
                event.stopPropagation();
                !selected && onSelect();
                showResourceDataModal(node.id);
              }}>
              Data
            </Button>
            <Button
              size="xs"
              transition={false}
              onClick={event => {
                event.stopPropagation();
                !selected && onSelect();
                showEditResourceModal(node.id);
              }}>
              Edit
            </Button>
            <IconButton
              tooltip="Delete"
              iconName="Trash2"
              size="sm"
              variant="danger"
              transition={false}
              onClick={event => {
                event.stopPropagation();
                !selected && onSelect();
                showDeleteResourceModal(node.id);
              }}
            />
          </div>
        </foreignObject>
      )}
    </motion.g>
  );
}
