import {FETCH_SUCCESS, UPDATE_SUCCESS} from '../actions/data';
import {FORM_HIDE} from '../actions/forms';
import {LOGOUT} from '../actions/user';

const data = (state = {}, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
    case UPDATE_SUCCESS:
      return {
        ...state,
        [action.resourceId]: action.data,
      };

    case FORM_HIDE:
    case LOGOUT:
      return {};

    default:
      return state;
  }
};

export default data;
export const getData = (state, resourceId) => state[resourceId];
