import React, { useRef, useState } from 'react';
import { Transition, animated, config } from 'react-spring';
import Button from './Button/TextButton';
import Downshift from 'downshift';
import Icon from './Button/Icon';
import Input from './Form/Input';
import get from 'lodash/get';
import Portal from './Portal';

const Menu = ({ orient = 'middle', rect, t, scrollY, ...props }) => (
    <animated.div
        className="absolute w-64 z-20 rounded-xl bg-gray-200 pl-2 pr-2 pt-2 shadow-lg border border-gray-300"
        style={{
            opacity: t,
            top: scrollY + rect.y + rect.height + 4,
            left: rect.x - (256 - rect.width) / 2,
            transform: t.interpolate({
                range: [0, 1],
                output: ['translateY(-10px) scale(0.8)', 'translateY(0px) scale(1)'],
            }),
        }}
        {...props}
    />
);

const Item = ({ children, highlighted, isSelected, ...rest }) => (
    <div
        className={`cursor-pointer flex items-center justify-between
      whitespace-nowrap text-sm font-mono rounded-xl px-3 py-2 active:bg-blue-600
      ${highlighted ? 'text-white bg-blue-500' : ''}`}
        {...rest}>
        {children}
        {isSelected && (
            <div
                className={`w-4 h-4 flex items-center rounded-sm text-white bg-blue-500`}>
                <Icon name="Check" size={16} />
            </div>
        )}
    </div>
);

function SearchableList({ selectedOption, options, onChange }) {
    return (
        <Downshift
            itemToString={item => (item ? item.name : '')}
            onSelect={option => {
                onChange(option);
            }}>
            {({
                getInputProps,
                getItemProps,
                getRootProps,
                getMenuProps,
                inputValue,
                highlightedIndex,
            }) => {
                const filteredOptions = options.filter(option => {
                    return option.label
                        .toLowerCase()
                        .includes((inputValue || '').toLowerCase());
                });
                return (
                    <div {...getRootProps({}, { suppressRefError: true })}>
                        <div className="relative">
                            <Input
                                className="bg-white border-white rounded-lg pr-8"
                                {...getInputProps({
                                    placeholder: 'Search...',
                                    autoFocus: true,
                                })}
                            />
                            <div className="absolute top-0 bottom-0 right-2 flex items-center">
                                <Icon name="Search" />
                            </div>
                        </div>
                        <div
                            {...getMenuProps({
                                className: 'max-h-72 overflow-y-auto pt-2 pb-2',
                            })}>
                            {filteredOptions.map((option, i) => {
                                const itemProps = getItemProps({
                                    key: option.value,
                                    item: option,
                                    onClick: e => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    },
                                    highlighted: highlightedIndex === i,
                                });
                                const isSelected =
                                    selectedOption && selectedOption.value === option.value;

                                return (
                                    <Item {...{ isSelected, ...itemProps }}>{option.label}</Item>
                                );
                            })}
                            {filteredOptions.length === 0 ? (
                                <div className="text-sm text-gray-400 text-center py-2">
                                    No results...
                                </div>
                            ) : null}
                        </div>
                    </div>
                );
            }}
        </Downshift>
    );
}

function Select({ options, value, onChange, size }) {
    const scrollYRef = useRef();
    const [isOpen, setIsOpen] = useState();
    const [rect, setRect] = useState(null);
    const selectedOption = options.find(option => option.value === value);
    const toggleMenu = event => {
        event.stopPropagation();
        event.preventDefault();
        if (isOpen) {
            return setIsOpen(false);
        }
        scrollYRef.current = window.scrollY;
        setRect(event.target.getBoundingClientRect());
        setIsOpen(true);
    };

    return (
        <div className="relative z-auto">
            <Button
                size={size}
                onClick={toggleMenu}
                type="button"
                fullWidth={true}
                isActive={isOpen}>
                {get(selectedOption, 'label', '-Select-')}
            </Button>
            <Portal>
                {isOpen && (
                    <div
                        style={{ height: window.document.body.scrollHeight }}
                        className="fixed top-0 bottom-0 left-0 right-0 z-20"
                        onClick={() => setIsOpen(false)}
                    />
                )}
                <Transition
                    native
                    config={config.wobbly}
                    from={{ t: 0 }}
                    enter={{ t: 1 }}
                    leave={{ t: 0 }}>
                    {isOpen &&
                        (({ t }) => (
                            <Menu
                                scrollY={scrollYRef.current}
                                t={t}
                                rect={rect}
                                onChange={e => e.stopPropagation()}>
                                <SearchableList
                                    selectedOption={selectedOption}
                                    options={options}
                                    onChange={newValue => {
                                        onChange(newValue.value);
                                        setIsOpen(false);
                                    }}
                                />
                            </Menu>
                        ))}
                </Transition>
            </Portal>
        </div>
    );
}

export default Select;
