import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import ThirdPartyLogin from './ThirdPartyLogin';
import { connect } from 'react-redux';
import { login } from '../../actions/user';
import { motion } from 'framer-motion';
import { notify } from '../../actions/notifications';
import Button from '../../components/comman/Button/TextButton';
import Alert from '../../components/comman/Form/Alert';
import Input from '../../components/comman/Form/Input';
import InputGroup from '../../components/comman/Form/InputGroup';
import Icon from '../../components/comman/Button/Icon';

class LoginForm extends Component {
    state = {
        email: '',
        password: '',
        error: null,
        isFetching: false,
    };

    componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('flash');

        switch (code) {
            case '1':
                this.props.notify({
                    type: 'failure',
                    message: 'Account with this email already exists',
                });
                break;
            default:
            // Do nothing
        }
    }

    render() {
        // const { user } = this.props;
        const { isFetching, error, email, password } = this.state;
        const disableBtn = isFetching || error || !email || !password;

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
                            Sign in
                        </h1>
                    </div>
                    <div className="rounded-xl bg-white shadow p-4 sm:p-6">
                        <ThirdPartyLogin />
                        <form
                            className="grid grid-cols-1 gap-6 my-6 py-6 border-t-2 border-b-2 border-gray-200"
                            onSubmit={this.onSubmit}>
                            <InputGroup label="Email">
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
                            <InputGroup label="Password">
                                <Input
                                    placeholder="..."
                                    name="password"
                                    type="password"
                                    disabled={isFetching}
                                    value={password}
                                    onChange={this.onChange}
                                />
                            </InputGroup>
                            <InputGroup
                                helpText={
                                    error ? <Alert variant="danger">{error.message}</Alert> : null
                                }>
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
            </motion.div>
        );
    }

    onChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value, error: null });
    };

    onSubmit = event => {
        const { email, password } = this.state;
        event.preventDefault();
        if (email && password) {
            this.setState({ isFetching: true });
            this.props.login({
                email,
                password,
                error: null,
                success: false,
                callback: this.onResponse,
            });
        }
    };

    onResponse = error => {
        if (error) {
            return this.setState({
                error,
                isFetching: false,
            });
        }
    };
}

export default compose(
    // withRouter,
    connect(
        ({ user }) => ({ user }),
        dispatch => bindActionCreators({ login, notify }, dispatch)
    )
)(LoginForm);
