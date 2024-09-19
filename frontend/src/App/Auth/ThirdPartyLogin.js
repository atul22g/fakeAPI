import React from 'react';
import Button from '../../components/comman/Button/TextButton';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Oath } from '../../store/slices/authSlice';

const ThirdPartyLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // Github Login
    const ID = process.env.REACT_APP_GITHUB_CLIENTID;
    const ClientURL = process.env.REACT_APP_BASE_URL;
    const ServerURL = process.env.REACT_APP_BACKEND_URL;
    const Redirect = `${ClientURL}/login`;

    let URL = `https://github.com/login/oauth/authorize?client_id=${ID}&redirect_uri=${Redirect}`;

    // github Login 
    const githubAuth = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            try {
                const result = await axios.get(`${ServerURL}/api/user/github?code=${code}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                });
                dispatch(Oath(result.data));
                const ID = result.data.user._id;
                
                localStorage.setItem('fakeAPI_ID', ID);
                navigate('/dashboard');
            } catch (error) {
                console.log("responseGithub :  " + error);
            }
        }
    }
    githubAuth()

    // Google Login 
    const responseGoogle = async (response) => {
        try {
            if (response['code']) {
                let res = response['code'];
                const result = await axios.get(`${ServerURL}/api/user/google?code=${res}`);
                dispatch(Oath(result.data));
                const ID = result.data.user._id;
                localStorage.setItem('fakeAPI_ID', ID);
                navigate('/dashboard');
            }
        } catch (error) {
            console.log("responseGoogle :  " + error);
        }
    }
    let googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code',
    })

    return (
        <div className="grid grid-cols-1 gap-4">
            <a href={URL}><Button
                className="w-full"
                style={{ width: '100%' }}
                type="button"
            // onClick={githubLogin}
            >
                <span className="flex items-center justify-center gap-2">
                    <span>
                        <GithubIcon />
                    </span>
                    Sign in with Github
                </span>
            </Button>
            </a>
            <Button
                className="w-full z-20"
                type="button"
                onClick={googleLogin}>
                <span className="flex items-center justify-center gap-2" >
                    <span className="transform scale-125">
                        <GoogleIcon />
                    </span>
                    Sign in with Google
                </span>
            </Button>
        </div>
    )
}

export default ThirdPartyLogin





let GithubIcon = () => (
    <svg viewBox="0 0 24 24" width={16} height={16}>
        <path
            fill="currentColor"
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205
11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422
18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084
1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93
0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267
1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12
3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0
1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24
12.297c0-6.627-5.373-12-12-12"
        />
    </svg>
);

let GoogleIcon = () => (
    <svg width={16} height={16}>
        <g fill="none">
            <path
                d="M2.629 10.659A5.893 5.893 0 0 1 2 8c0-.956.226-1.858.629-2.659l2.065 1.544a3.487 3.487 0 0 0 0 2.23L2.629 10.66z"
                fill="#FBBC05"
            />
            <path
                d="M2.629 5.341C3.627 3.357 5.713 2 8.139 2c1.563 0 2.959.573 4.047 1.5L10.4 5.245a3.6 3.6 0 0 0-2.26-.79c-1.61 0-2.97 1.015-3.446 2.43L2.629 5.34z"
                fill="#EA4335"
            />
            <path
                d="M2.628 10.657L4.692 9.11c.475 1.417 1.835 2.435 3.448 2.435 1.702 0 2.986-.845 3.293-2.318H8.14V6.91h5.72c.084.355.14.736.14 1.091 0 3.818-2.79 6-5.86 6-2.427 0-4.514-1.358-5.512-3.343z"
                fill="#34A853"
            />
            <path
                d="M12.141 12.506l-1.96-1.483a2.704 2.704 0 0 0 1.252-1.796H8.14V6.91h5.72c.084.355.14.736.14 1.091 0 1.956-.732 3.482-1.859 4.506z"
                fill="#4285F4"
            />
        </g>
    </svg>
);
