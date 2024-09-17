import React from 'react';
import {motion} from 'framer-motion';

function getVariantClassNames(variant, textOnly) {
  switch (variant) {
    case 'default':
      return `border-gray-200 ${textOnly ? '' : 'bg-gray-50'}`;
    case 'success':
      return `text-emerald-700 border-emerald-200 ${
        textOnly ? '' : 'bg-emerald-50'
      }`;
    case 'warning':
      return `text-orange-600 border-orange-200 ${
        textOnly ? '' : 'bg-orange-50'
      }`;
    case 'danger':
      return `text-rose-600 border-rose-200 ${textOnly ? '' : 'bg-rose-50'}`;
    default:
      throw new Error(`Unknown variant: ${variant}`);
  }
}

export default function Alert({children, variant, textOnly = false}) {
  let baseClassNames = `${
    textOnly ? '' : 'px-3 py-2 border'
  } rounded-xl text-sm font-semibold font-mono font-semibold`;

  let variantClassNames = getVariantClassNames(variant, textOnly);
  let classNames = `${baseClassNames} ${variantClassNames}`;

  return (
    <motion.div
      layout
      transition={{type: 'tween'}}
      initial={{opacity: 0, height: 0}}
      animate={{opacity: 1, height: 'auto'}}
      className={classNames}>
      {children}
    </motion.div>
  );
}
