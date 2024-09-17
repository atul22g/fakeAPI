import Icon from './Icon';
import React from 'react';
import Tooltip from './Tooltip';

function getColor(variant, isActive) {
    switch (variant) {
        case 'primary':
            return `${isActive ? 'bg-blue-700' : 'bg-blue-500'
                } shadow-blue-500/50 hover:bg-blue-600 active:bg-blue-700 text-white
      disabled:shadow-none disabled:bg-blue-400`;
        case 'secondary':
            return `${isActive ? 'bg-gray-300' : 'bg-gray-200'
                } hover:bg-gray-300 active:bg-gray-300 text-gray-800 disabled:shadow-none
      disabled:bg-gray-200`;
        case 'danger':
            return `${isActive ? 'bg-rose-700' : 'bg-rose-500'
                } hover:bg-rose-600 active:bg-rose-700 text-white shadow-rose-500/50
      disabled:shadow-none disabled:bg-rose-400`;
        case 'minimal':
            return `${isActive ? 'bg-gray-300' : 'bg-transparent'
                } hover:bg-gray-200 active:bg-gray-300 shadow-none disabled:shadow-none
      disabled:bg-gray-100`;
        default:
            throw new Error(`Unknown variant: ${variant}`);
    }
}

function getSize(size) {
    switch (size) {
        case 'xs':
            return 'w-5 h-5 rounded-lg';
        case 'sm':
            return 'h-6 w-6 rounded-lg text-xs';
        case 'md':
            return 'w-9 h-9 rounded-xl';
        default:
            throw new Error(`Unknown size: ${size}`);
    }
}

function getIconSize(size) {
    switch (size) {
        case 'xs':
            return '14';
        case 'sm':
            return '14';
        case 'md':
            return '18';
        default:
            throw new Error(`Unknown size: ${size}`);
    }
}

const IconButton = ({
    variant = 'secondary',
    size = 'md',
    iconName,
    tooltip,
    isFetching,
    disabled,
    className: _className,
    extraClassName,
    isActive = false,
    transition = true,
    onClick,
    ...rest
}) => {
    const base = `box-border relative transition hover:scale-105 active:scale-95
    shadow active:shadow-sm focus:outline outline-2 outline-offset-2
    outline-blue-500 hover:outline-none cursor-pointer`;
    const colorClassNames = getColor(variant, isActive);
    const sizeClassNames = getSize(size);
    const className = `${transition ? base : ''
        } ${sizeClassNames} ${colorClassNames}`.trim();
    const iconSize = getIconSize(size);

    const btn = (
        <button
            className={className}
            disabled={disabled || isFetching}
            onClick={onClick}
            onTouchEnd={onClick}
            {...rest}>
            <Icon name={iconName} size={iconSize} className="w-full" />
        </button>
    );

    return isActive ? btn : <Tooltip trigger={btn} content={tooltip} />;
};

export default IconButton;
