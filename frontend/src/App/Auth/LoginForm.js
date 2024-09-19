import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import ThirdPartyLogin from './ThirdPartyLogin';
import Button from '../../components/comman/Button/TextButton';
import { isEmail } from 'validator';
import Input from '../../components/comman/Form/Input';
import InputGroup from '../../components/comman/Form/InputGroup';
import Icon from '../../components/comman/Button/Icon';
import { useDispatch } from 'react-redux';
import { signin } from '../../store/slices/authSlice';

const LoginForm = () => {
    const dispatch = useDispatch()
    // State to manage form inputs and submission status
    const [formState, setFormState] = useState({ email: '', password: '', });
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
    const { email, password } = formState;
    // Disable button if conditions are not met
    const disableBtn = !isEmail(email) || !password || !password.length;
    // Handle form submission
    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(signin({ email, password }));
        setFormState({email: '', password: '' });
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
                        Sign in
                    </h1>
                </div>
                <div className="rounded-xl bg-white shadow p-4 sm:p-6">
                    <ThirdPartyLogin />
                    <form
                        className="grid grid-cols-1 gap-6 my-6 py-6 border-t-2 border-b-2 border-gray-200"
                        onSubmit={(e) => onSubmit(e)} >
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
                        <InputGroup>
                            <Button
                                className="w-full"
                                variant="primary"
                                type="submit"
                                disabled={disableBtn}
                                fullWidth>
                                Login
                            </Button>
                        </InputGroup>
                    </form>
                    <div className="text-sm text-center space-y-2">
                        <p>
                            <Link to="/signup" className="text-blue-700">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm