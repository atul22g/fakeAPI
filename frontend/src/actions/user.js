import { DONATE, EMAIL_UPDATE } from '../reducers/forms';
import { deleteToken, getToken, saveToken } from './utils';
import { handleFormError, hideForm, submitForm } from './forms';
import { toast } from 'react-toastify';

export const ME = 'auth/me';
export const LOGIN = 'auth/login';
export const LOGOUT = 'auth/logout';
export const SUBSCRIPTION_UPDATE = 'user/updateSubscription';

const UNAUTHORIZED = 401;

export const me = callback => async dispatch => {
  let user = null;
  let token = getToken();

  if (!token) {
    return dispatch({ type: ME, authorized: false });
  }

  try {
    user = await fetch(`/api/users/me`, {
      headers: { 'Content-Type': 'application/json', token },
    }).then(res => {
      if (res.status === UNAUTHORIZED) {
        throw new Error(token ? 'Session expired' : '');
      }

      return res.json();
    });

    dispatch({
      type: ME,
      authorized: true,
      user,
    });

    if (callback) {
      callback();
    }
  } catch (error) {
    dispatch({
      type: ME,
      authorized: false,
    });
  }
};

export const updateUser =
  ({ id, email }) =>
    async dispatch => {
      let user = null;

      try {
        dispatch(submitForm(EMAIL_UPDATE));
        user = await fetch(`/api/users/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', token: getToken() },
          body: JSON.stringify({ email }),
        }).then(res => {
          switch (res.status) {
            case 500:
              throw new Error('Oops, something went wrong...');
            case 409:
              throw new Error(`${email} is already taken.`);
            case 400:
              throw new Error(`Invalid email - ${email}`);
            default:
              break;
          }

          return res.json();
        });
      } catch (error) {
        return dispatch(handleFormError(EMAIL_UPDATE, error));
      }

      dispatch({
        type: ME,
        authorized: true,
        user,
        notification: { type: 'success', message: 'Email updated' },
      });

      dispatch(hideForm(EMAIL_UPDATE));
    };

export const openStripeCustomerPortal = () => async dispatch => {
  try {
    dispatch(submitForm(DONATE));
    const res = await fetch('/api/subscriptions/manage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', token: getToken() },
    });
    const json = await res.json();
    if (res.status > 399) {
      throw new Error(json.message);
    }
    window.location.href = json.sessionUrl;
  } catch (error) {
    dispatch(handleFormError(DONATE, error));
  }
};

export const checkout = plan => async dispatch => {
  try {
    dispatch(submitForm(DONATE));
    const res = await fetch('/api/subscriptions/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', token: getToken() },
      body: JSON.stringify({ plan }),
    });
    const json = await res.json();
    if (res.status > 399) {
      throw new Error(json.message);
    }
    window.location.href = json.sessionUrl;
  } catch (error) {
    dispatch(handleFormError(DONATE, error));
  }
};

export const login =
  ({ email, password, callback }) =>
    async dispatch => {
      const body = JSON.stringify({ email, password });
      const headers = { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" };

      let res = null;
      try {
        res = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/user/auth', {
          method: 'POST',
          headers,
          body,
        }).then(res => {

          if (res.status === UNAUTHORIZED) {
            toast.warn("Incorrect email/password combination"); 
          }
          return res.json();
        });

        const res_data = await res;

        if (res_data.status === "warn") {
          toast.warn("Incorrect email/password combination");
        }else{
          toast.success("Login successful");
        }

        saveToken(res.token);
        await dispatch(me());
        callback();
      } catch (error) {
        console.log("error", error);

        callback(error);
      }
    };


export const signup = ({ name, email, password, callback }) =>
  async dispatch => {
    const body = JSON.stringify({ name, email, password });

    let res = null;
    try {
      res = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/user/create', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body,
      });
      const res_data = await res.json();
      if (res.ok) {
        toast.success("Login successful");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
        console.log("invalid credential");
      }

    } catch (error) {
      console.log("error", error);
      callback(error);
    }
  };

export const logout = () => dispatch => {
  deleteToken();
  dispatch({
    type: LOGOUT,
  });
};
