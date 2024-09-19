import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from '../../components/comman/Form/Input';
import InputGroup from '../../components/comman/Form/InputGroup';
import Icon from '../../components/comman/Button/Icon';
import Button from '../../components/comman/Button/TextButton';
import ThirdPartyLogin from './ThirdPartyLogin';
import { isEmail } from 'validator';
import { signup } from '../../store/slices/authSlice';

const SignupForm = () => {
    const dispatch = useDispatch()
    // State to manage form inputs and submission status
    const [formState, setFormState] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    // Handle input changes
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // export Data to be submitted
    const { name, email, password, confirmPassword } = formState;
    // Disable button if conditions are not met
    const disableBtn =  !name || !isEmail(email) || !password || !password.length || !confirmPassword || password !== confirmPassword;
    // Handle form submission
    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(signup({ name, email, password }));
        
        setFormState({ name: '', email: '', password: '', confirmPassword: '' });
    };
    return (
        <div initial={{ opacity: 0.5 }} animate={{ opacity: 1 }}>
            <div className="max-w-md mx-auto sm:my-20 space-y-5 font-mono">
                <div className="grid grid-cols-10">
                    <Link to="/" className="col-span-2 flex items-center text-blue-700">
                        <div className="mr-2">
                            <Icon name="ArrowLeft" />
                        </div>
                        Back
                    </Link>
                    <h1 className="col-span-6 text-2xl font-mono font-bold text-center">
                        Sign up
                    </h1>
                </div>
                <div className="rounded-xl bg-white shadow p-4 sm:p-6">
                    <ThirdPartyLogin />
                    <form onSubmit={(e) => onSubmit(e, formState)} className="grid grid-cols-1 gap-6 my-6 py-6 border-t-2 border-b-2 border-gray-200">
                        <InputGroup label="Name">
                            <Input
                                placeholder="..."
                                name="name"
                                type="name"
                                autoComplete="on"
                                value={name}
                                onChange={handleInput}
                            />
                        </InputGroup>
                        <InputGroup label="Email">
                            <Input
                                placeholder="..."
                                name="email"
                                type="email"
                                autoComplete="on"
                                value={email}
                                onChange={handleInput}
                            />
                        </InputGroup>
                        <InputGroup label="Password">
                            <Input
                                placeholder="..."
                                name="password"
                                type="password"
                                value={password}
                                onChange={handleInput}
                            />
                        </InputGroup>
                        <InputGroup label="Confirm Password">
                            <Input
                                placeholder="..."
                                name="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={handleInput}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Button
                                fullWidth
                                type="submit"
                                variant="primary"
                                disabled={disableBtn}
                            >
                                Sign up
                            </Button>
                        </InputGroup>
                    </form>
                    <div className="text-sm text-center">
                        Already have an account? Login{' '}
                        <Link to="/login" className="text-blue-700">
                            here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupForm;