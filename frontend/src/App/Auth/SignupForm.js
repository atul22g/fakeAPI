import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import Alert from '../../components/comman/Form/Alert';
import Input from '../../components/comman/Form/Input';
import InputGroup from '../../components/comman/Form/InputGroup';
import Icon from '../../components/comman/Button/Icon';
import Button from '../../components/comman/Button/TextButton';


import ThirdPartyLogin from './ThirdPartyLogin';
import { connect } from 'react-redux';
import { isEmail } from 'validator';
import { motion } from 'framer-motion';
import { signup } from '../../actions/user';

class SignupForm extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: null,
        isFetching: "",
    };

    render() {
        // const { user } = this.props;
        const { isFetching, errors, name, email, password, confirmPassword } =
            this.state;

        const disableBtn =
            isFetching ||
            !name ||
            !isEmail(email) ||
            !password ||
            !password.length ||
            !confirmPassword ||
            password !== confirmPassword;

        // if (user.authorized) {
        //     return <Redirect to="/" />;
        // }

        return (
            <motion.div initial={{ opacity: 0.5 }} animate={{ opacity: 1 }}>
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
                        <form
                            className="grid grid-cols-1 gap-6 my-6 py-6 border-t-2 border-b-2 border-gray-200"
                            onSubmit={this.onSubmit}>
                            <InputGroup label="Name">
                                <Input
                                    placeholder="..."
                                    name="name"
                                    type="name"
                                    autoComplete="on"
                                    disabled={isFetching}
                                    value={name}
                                    onChange={this.onChange}
                                />
                            </InputGroup>
                            <InputGroup
                                label="Email"
                                helpText={
                                    errors && errors.email ? (
                                        <Alert variant="danger">{errors.email}</Alert>
                                    ) : null
                                }>
                                <Input
                                    placeholder="..."
                                    name="email"
                                    type="email"
                                    autoComplete="on"
                                    disabled={isFetching}
                                    value={email}
                                    onChange={this.onChange}
                                />
                            </InputGroup>
                            <InputGroup
                                label="Password"
                                helpText={
                                    errors && errors.password ? (
                                        <Alert variant="danger">{errors.password}</Alert>
                                    ) : null
                                }>
                                <Input
                                    placeholder="..."
                                    name="password"
                                    type="password"
                                    disabled={isFetching}
                                    value={password}
                                    onChange={this.onChange}
                                />
                            </InputGroup>
                            <InputGroup label="Confirm Password">
                                <Input
                                    placeholder="..."
                                    name="confirmPassword"
                                    type="password"
                                    disabled={isFetching}
                                    value={confirmPassword}
                                    onChange={this.onChange}
                                />
                            </InputGroup>
                            <InputGroup>
                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="primary"
                                    disabled={disableBtn}>
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
            </motion.div>
        );
    }

    onChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value, errors: null });
    };

    onSubmit = event => {
        const { name, email, password, confirmPassword } = this.state;
        console.log("onSubmit");
        console.log(name, email, password, confirmPassword);
        
        event.preventDefault();

        if (isEmail(email) && password && password === confirmPassword) {
            this.setState({ isFetching: true });
            this.props.signup({ name, email, password, callback: this.onResponse });
        }
    };

    onResponse = errors => {
        if (errors) {
            return this.setState({
                errors,
                success: !errors,
                isFetching: false,
            });
        }

        this.props.history.push({ pathname: '/' });
    };
}

export default compose(
    // withRouter,
    connect(
        ({ user }) => ({ user }),
        dispatch => bindActionCreators({ signup }, dispatch)
    )
)(SignupForm);
