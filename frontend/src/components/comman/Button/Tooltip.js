import { AnimatePresence, motion } from 'framer-motion';
import React, { Fragment, cloneElement, useRef, useState } from 'react';

import Portal from '../Portal';

export default function Tooltip({ trigger, content }) {
    const [showTooltip, setShowTooltip] = useState(false);
    const [rect, setRect] = useState(null);
    const triggerRef = useRef(null);

    if (!content) return trigger;

    const enhanceTrigger = cloneElement(trigger, {
        ref: triggerRef,
        onMouseOver: () => {
            setRect(triggerRef.current.getBoundingClientRect());
            setShowTooltip(true);
        },
        onMouseOut: () => {
            setShowTooltip(false);
        },
    });

    return (
        <Fragment>
            {enhanceTrigger}
            <Portal>
                <AnimatePresence>
                    {showTooltip && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            style={{
                                left: rect.left,
                                top: window.scrollY + rect.top + rect.height + 5,
                            }}
                            className="invisible sm:visible pointer-events-none z-50 absolute
              top-0 left-0 px-2 py-1 rounded-md bg-gray-900 shadow
            text-white text-xs font-semibold font-mono whitespace-nowrap">
                            {content}
                        </motion.div>
                    )}
                </AnimatePresence>
            </Portal>
        </Fragment>
    );
}
