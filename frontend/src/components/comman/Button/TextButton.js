import React from 'react';

function getColor(variant, isActive) {
    switch (variant) {
        case 'primary':
            return `${isActive ? 'bg-blue-700' : 'bg-blue-500'
                } shadow-blue-500/50 hover:bg-blue-600 active:bg-blue-700 text-white`;
        case 'secondary':
            return `${isActive ? 'bg-gray-300' : 'bg-gray-200'
                } hover:bg-gray-300 active:bg-gray-300 text-gray-800`;
        case 'danger':
            return `${isActive ? 'bg-rose-700' : 'bg-rose-500'
                } bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white shadow-rose-500/50`;
        case 'warning':
            return `${isActive ? 'bg-orange-700' : 'bg-orange-500'
                } bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white shadow-orange-500/50`;
        case 'minimal':
            return `${isActive ? 'bg-gray-300' : 'bg-transparent'
                } bg-transparent hover:bg-gray-200 active:bg-gray-300 shadow-none`;
        default:
            throw new Error(`Unknown variant: ${variant}`);
    }
}

function getSize(size) {
    switch (size) {
        case 'xs':
            return 'px-1 h-6 rounded-lg text-xs';
        case 'sm':
            return 'px-2 h-9 rounded-xl text-base';
        case 'md':
            return 'px-3 py-2 rounded-2xl text-base';
        case 'lg':
            return 'px-4 py-3 rounded-3xl text-xl';
        default:
            throw new Error(`Unknown size: ${size}`);
    }
}

const Button = ({
    variant = 'secondary',
    size = 'md',
    disabled,
    isActive = false,
    fullWidth = false,
    transition = true,
    onClick,
    ...props
}) => {
    const base = transition
        ? `${fullWidth ? 'w-full' : 'w-auto'
        } appearance-none truncate box-border transition active:scale-95 shadow
    active:shadow-sm focus:outline outline-2 outline-offset-2 outline-blue-500
    hover:outline-none border-2 border-transparent font-medium
    disabled:opacity-75 disabled:shadow-none disabled:pointer-events-none
    cursor-pointer`
        : `${fullWidth ? 'w-full' : 'w-auto'} appearance-none truncate box-border 
       border-2 border-transparent font-medium disabled:pointer-events-none
      cursor-pointer`;
    const colorClassNames = getColor(variant, isActive);
    const sizeClassNames = getSize(size);
    const className = `${base} ${colorClassNames} ${sizeClassNames}`.trim();

    return (
        <button
            {...props}
            className={className}
            disabled={disabled}
            onClick={onClick}
            onTouchEnd={onClick}
        />
    );
};

export default Button;
