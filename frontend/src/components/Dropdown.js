import Downshift from 'downshift';
import React from 'react';
import IconButton from './comman/Button/IconButton';
import Button from './comman/Button/TextButton';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';


const Menu = () => {
    const dispatch = useDispatch();
    const Navigation = useNavigate();
    const name = useSelector(state => state.auth.user.name);

    return (
        <div className="absolute w-64 z-20 rounded-xl bg-gray-200 px-2 py-2 mt-1 shadow-lg border border-gray-300 right-0"
            style={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}>
            <div className="px-3 py-2 text-xs text-gray-500 font-semibold">Hi, {name}!</div>
            <div onClick={() => Navigation('/dashboard')} className="cursor-pointer flex items-center whitespace-nowrap text-sm font-normal font-mono rounded-xl px-3 py-2 active:bg-blue-600"
                index="2"
                id="downshift-0-item-2"
                role="option"
                aria-selected="false">
                <div className="mr-3">
                    <i className="fa-solid fa-house"></i>
                </div>
                Home
            </div>
            {/* Logout */}
            <div className="cursor-pointer flex items-center whitespace-nowrap text-sm font-normal font-mono rounded-xl px-3 py-2 active:bg-blue-600"

                index="2"
                id="downshift-0-item-2"
                role="option"
                onClick={() => dispatch(logout())}
                aria-selected="false">
                <div className="mr-3 undefined">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                </div>
                Logout
            </div>
        </div>
    )
}



class Dropdown extends React.Component {
    render() {
        const {

            iconName,
            buttonText,
            tooltip,
            variant = 'secondary',
        } = this.props;
        return (
            <Downshift
                itemToString={item => (item ? item.label : '')}
                onSelect={option => option.onClick()}>
                {({ getToggleButtonProps, getItemProps, isOpen, highlightedIndex }) => {
                    return (
                        <div className="relative z-auto font-mono">
                            {iconName ? (
                                <IconButton
                                    {...{ variant, iconName, tooltip, isActive: isOpen }}
                                    {...getToggleButtonProps()}
                                />
                            ) : (
                                <Button {...getToggleButtonProps()}>{buttonText}</Button>
                            )}
                            {isOpen && (
                                <Menu />
                            )}
                        </div>
                    );
                }}
            </Downshift>
        );
    }
}

export default Dropdown;
