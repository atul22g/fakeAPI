import React from 'react';

export default function Card({ odd, heading, children }) {
    let bgClassNames =
        'before:rotate-6 before:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500';
    if (!odd) {
        bgClassNames =
            'before:rotate-[-6deg] before:bg-gradient-to-r from-pink-500 to-yellow-500';
    }

    return (
        <div
            className={`before:block before:absolute before:rounded-xl before:opacity-40 before:-inset-1 before:-skew-y-3 before:scale-110 ${bgClassNames} before:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative inline-block`}>
            <div className="relative rounded-2xl shadow-2xl bg-white p-6 space-y-4">
                <h4 className="uppercase text-xs text-gray-400 font-bold tracking-wider">
                    {heading}
                </h4>
                <div className="">{children}</div>
            </div>
        </div>
    );
}
