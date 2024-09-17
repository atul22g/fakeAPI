import {getToken} from './utils';
import {submitForm, hideForm, handleFormError} from './forms';
import {
  NEW_PROJECT,
  EDIT_PROJECT,
  CLONE_PROJECT,
  DELETE_PROJECT,
  COLLABORATORS,
} from '../reducers/forms';

export const FETCH_FAILURE = 'projects/fetchFailure';
export const FETCH_SUCCESS = 'projects/fetchSuccess';
export const CREATE_SUCCESS = 'projects/createSuccess';
export const UPDATE_SUCCESS = 'projects/updateSuccess';
export const DELETE_SUCCESS = 'projects/deleteSuccess';

export const fetchProjects = () => async dispatch => {
  let projects = null;

  try {
    projects = await fetch('/api/mocks', {
      headers: {'Content-Type': 'application/json', token: getToken()},
    }).then(res => res.json());
  } catch (error) {
    return dispatch({
      type: FETCH_FAILURE,
      error,
      notification: {type: 'failure', message: 'Failed to load projects'},
    });
  }

  dispatch({
    type: FETCH_SUCCESS,
    projects,
  });
};

export const createProject =
  ({name, prefix, collaborators}) =>
  async dispatch => {
    let project = null;

    try {
      dispatch(submitForm(NEW_PROJECT));
      project = await fetch('/api/mocks', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', token: getToken()},
        body: JSON.stringify({name, prefix, collaborators}),
      }).then(res => {
        if (res.status !== 200) {
          throw new Error('Oops, something went wrong...');
        }
        return res.json();
      });
    } catch (error) {
      return dispatch(handleFormError(NEW_PROJECT, error));
    }

    if (typeof project === 'string') {
      return dispatch(handleFormError(NEW_PROJECT, new Error(project)));
    }

    dispatch({
      type: CREATE_SUCCESS,
      notification: {type: 'success', message: 'Project created'},
      project,
    });
    dispatch(hideForm(NEW_PROJECT));
  };

export const updateProject =
  ({name, prefix, collaborators, id}) =>
  async dispatch => {
    let project = null;

    try {
      dispatch(submitForm(EDIT_PROJECT));
      project = await fetch(`/api/mocks/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', token: getToken()},
        body: JSON.stringify({name, prefix, collaborators}),
      }).then(res => {
        if (res.status !== 200) {
          throw new Error('Oops, something went wrong...');
        }
        return res.json();
      });
    } catch (error) {
      return dispatch(handleFormError(EDIT_PROJECT, error));
    }

    if (typeof project === 'string') {
      return dispatch(handleFormError(EDIT_PROJECT, new Error(project)));
    }

    dispatch({
      type: UPDATE_SUCCESS,
      notification: {type: 'success', message: 'Project updated'},
      project,
    });
    dispatch(hideForm(EDIT_PROJECT));
  };

export const updateCollaborators =
  ({id, name, prefix, collaborators}) =>
  async dispatch => {
    let project = null;

    try {
      dispatch(submitForm(COLLABORATORS));
      project = await fetch(`/api/mocks/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', token: getToken()},
        body: JSON.stringify({name, prefix, collaborators}),
      }).then(res => {
        if (res.status !== 200) {
          throw new Error('Oops, something went wrong...');
        }
        return res.json();
      });
    } catch (error) {
      return dispatch(handleFormError(COLLABORATORS, error));
    }

    if (typeof project === 'string') {
      return dispatch(handleFormError(COLLABORATORS, new Error(project)));
    }

    dispatch({
      type: UPDATE_SUCCESS,
      notification: {type: 'success', message: 'Project updated'},
      project,
    });
    dispatch(hideForm(COLLABORATORS));
  };

export const cloneProject =
  ({name, prefix, collaborators, id}, callback) =>
  async dispatch => {
    let project = null;

    try {
      dispatch(submitForm(CLONE_PROJECT));
      project = await fetch(`/api/mocks/${id}/clone`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', token: getToken()},
        body: JSON.stringify({name, prefix, collaborators}),
      }).then(res => {
        if (res.status !== 200) {
          const error = new Error('No subscription');
          error.status = res.status;
          throw error;
        }
        return res.json();
      });
    } catch (error) {
      callback && callback(error);
      return dispatch(handleFormError(CLONE_PROJECT, error));
    }

    if (typeof json === 'string') {
      return dispatch(handleFormError(CLONE_PROJECT, new Error(project)));
    }

    dispatch({
      type: CREATE_SUCCESS,
      notification: {type: 'success', message: 'Project cloned'},
      project,
    });
    dispatch(hideForm(CLONE_PROJECT));
    callback && callback(null, project.id);
  };

export const deleteProject = (id, callback) => async dispatch => {
  try {
    dispatch(submitForm(DELETE_PROJECT));
    await fetch(`/api/mocks/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json', token: getToken()},
    }).then(res => res.json());
  } catch (error) {
    return dispatch(handleFormError(DELETE_PROJECT, error));
  }

  dispatch(hideForm(DELETE_PROJECT));
  dispatch({
    type: DELETE_SUCCESS,
    id,
    notification: {type: 'success', message: 'Project deleted'},
  });
  callback();
};
