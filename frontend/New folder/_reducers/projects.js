import without from 'lodash/without';
import {LOGOUT} from '../actions/user';
import {
  FETCH_SUCCESS,
  FETCH_FAILURE,
  CREATE_SUCCESS,
  UPDATE_SUCCESS,
  DELETE_SUCCESS,
} from '../actions/projects';

const STATE = {
  isFetching: true,
  error: null,
  ids: [],
  byId: {},
};

const projects = (state = STATE, action) => {
  switch (action.type) {
    case LOGOUT:
      return {...STATE};

    case FETCH_SUCCESS: {
      let ids = [];
      let byId = {};

      (action.projects || []).forEach(item => {
        ids = [...ids, item.id];
        byId = {...byId, [item.id]: item};
      });

      return {
        isFetching: false,
        error: null,
        ids,
        byId,
      };
    }

    case CREATE_SUCCESS:
      return {
        ...state,
        ids: [...state.ids, action.project.id],
        byId: {
          ...state.byId,
          [action.project.id]: action.project,
        },
      };

    case UPDATE_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.project.id]: action.project,
        },
      };

    case DELETE_SUCCESS:
      return {
        ...state,
        ids: without(state.ids, action.id),
      };

    case FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default projects;
export const projectById = (state, id) => state.byId[id];
