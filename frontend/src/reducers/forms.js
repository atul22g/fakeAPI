import {
  FORM_CLEAR_ERROR,
  FORM_HIDE,
  FORM_SHOW,
  FORM_SUBMIT,
  FORM_SUBMIT_FAILURE,
  FORM_SUBMIT_SUCCESS,
} from '../actions/forms';

import {LOGOUT} from '../actions/user';

export const DONATE = 'donate';
export const EMAIL_UPDATE = 'updateEmail';

// Project forms
export const NEW_PROJECT = 'newProject';
export const EDIT_PROJECT = 'editProject';
export const CLONE_PROJECT = 'cloneProject';
export const DELETE_PROJECT = 'deleteProject';
export const MAGIC_LINK = 'magiLink';
export const COLLABORATORS = 'collaborators';

// Resource forms
export const NEW_RESOURCE = 'newResource';
export const EDIT_RESOURCE = 'editResource';
export const DELETE_RESOURCE = 'deleteResource';
export const RESOURCE_DATA = 'resourceData';

const FORM_STATE = {
  prompt: false,
  show: false,
  redirect: false,
  isFetching: false,
  error: null,
  project: null,
  resourceId: null,
};

const STATE = {
  [DONATE]: {...FORM_STATE},
  [NEW_PROJECT]: {...FORM_STATE},
  [EDIT_PROJECT]: {...FORM_STATE},
  [CLONE_PROJECT]: {...FORM_STATE},
  [DELETE_PROJECT]: {...FORM_STATE},
  [NEW_RESOURCE]: {...FORM_STATE},
  [EDIT_RESOURCE]: {...FORM_STATE},
  [DELETE_RESOURCE]: {...FORM_STATE},
  [RESOURCE_DATA]: {...FORM_STATE},
  [MAGIC_LINK]: {...FORM_STATE},
  [COLLABORATORS]: {...FORM_STATE},
  [EMAIL_UPDATE]: {...FORM_STATE},
};

const forms = (state = STATE, action) => {
  switch (action.type) {
    case FORM_SHOW:
      return {
        ...Object.keys(state).reduce((result, key) => {
          return {...result, [key]: {...state[key], show: false}};
        }, {}),
        [action.formName]: {
          ...state[action.formName],
          show: true,
          project: action.project,
          resourceId: action.resourceId,
          redirect: action.redirect,
        },
      };

    case FORM_HIDE:
      return {
        ...state,
        [action.formName]: {
          ...FORM_STATE,
          prompt: false,
          redirect: false,
          project: null,
          resourceId: null,
        },
      };

    case FORM_SUBMIT:
      return {
        ...state,
        [action.formName]: {
          ...state[action.formName],
          isFetching: true,
          error: null,
        },
      };

    case FORM_CLEAR_ERROR:
      return {
        ...state,
        [action.formName]: {
          ...state[action.formName],
          error: null,
        },
      };

    case FORM_SUBMIT_SUCCESS:
      return {
        ...state,
        [action.formName]: {
          ...state[action.formName],
          isFetching: false,
          error: null,
        },
      };

    case FORM_SUBMIT_FAILURE:
      return {
        ...state,
        [action.formName]: {
          ...state[action.formName],
          isFetching: false,
          error: action.error,
        },
      };

    case LOGOUT:
      return {...STATE};

    default:
      return state;
  }
};

export default forms;
export const formStatus = (state, formName) => state[formName];
