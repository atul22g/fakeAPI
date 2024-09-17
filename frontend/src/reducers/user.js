import { ME, SUBSCRIPTION_UPDATE, LOGOUT } from '../actions/user';

const STATE = {
  isFetching: true,
  authorized: false,
  userName: '',
  userEmail: '',
  userUserID: '',
};

const user = (state = STATE, action) => {
  switch (action.type) {
    case ME:
      return {

        isFetching: false,
        authorized: action.authorized,
        userName: action.user.name,
        userEmail: action.user.email,
        userUserID: action.user.userID,
      };

    case SUBSCRIPTION_UPDATE:
      return {
        ...state,
        ...action.user,
      };

    case LOGOUT:
      return {
        isFetching: false,
        authorized: false,
        name: null,
      };

    default:
      return state;
  }
};

export default user;
export const isAuthorized = state => !state.authorized;
export const isFetching = state => state.isFetching;
