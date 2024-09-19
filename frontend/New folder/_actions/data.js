import {getToken} from './utils';
import {notify} from './notifications';
import {fetchProjectDetails} from './projectDetails';
import {
  hideForm,
  submitForm,
  handleFormError,
  handleFormSuccess,
} from './forms';
import {RESOURCE_DATA} from '../_reducers/forms';

export const GENERATE = 'data/generate';
export const GENERATE_SUCCESS = 'data/generateSuccess';
export const GENERATE_FAILURE = 'data/generateFailure';
export const GENERATE_ALL = 'data/generateAll';
export const RESET_ALL = 'data/resetAll';
export const FETCH_SUCCESS = 'data/fetchSuccess';
export const UPDATE_SUCCESS = 'data/updateSuccess';

export const generateAll = projectId => async dispatch => {
  dispatch({type: GENERATE_ALL, projectId});

  try {
    const url = `/api/mocks/${projectId}/resources/generate_all`;
    await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', token: getToken()},
    }).then(res => {
      if (res.status !== 200) {
        throw new Error('Failed to generated data');
      }
    });
  } catch (error) {
    return dispatch({
      type: GENERATE_FAILURE,
      notification: {type: 'failure', message: error.message},
    });
  }

  dispatch({
    type: GENERATE_SUCCESS,
    notification: {type: 'success', message: 'Data generated'},
  });
};

export const resetAll = projectId => async dispatch => {
  dispatch({type: RESET_ALL, projectId});

  try {
    const url = `/api/mocks/${projectId}/resources/reset_all`;
    await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', token: getToken()},
    }).then(res => {
      if (res.status !== 200) {
        throw new Error('Failed to reset data');
      }
    });
  } catch (error) {
    return dispatch({
      type: GENERATE_FAILURE,
      notification: {type: 'failure', message: error.message},
    });
  }

  dispatch({
    type: GENERATE_SUCCESS,
    notification: {type: 'success', message: 'Data reset'},
  });
};

export const generateData =
  ({count, prevCount, projectId, resourceId, canGenerate}) =>
  async dispatch => {
    if (!canGenerate) {
      return dispatch(
        notify({
          type: 'failure',
          message: 'Generate data for parent resource first',
        })
      );
    }

    dispatch({type: GENERATE, count, projectId, resourceId});

    try {
      const url = `/api/mocks/${projectId}/resources/${resourceId}/generate`;
      await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', token: getToken()},
        body: JSON.stringify({count}),
      }).then(res => {
        if (res.status !== 200) {
          throw new Error('Failed to generate data');
        }
      });
    } catch (error) {
      return dispatch({
        type: GENERATE,
        count: prevCount,
        projectId,
        resourceId,
        notification: {type: 'failure', message: error.message},
      });
    }

    dispatch(
      notify({
        type: 'success',
        message: count === 0 ? 'Data reset' : 'Data generated',
      })
    );
  };

export const fetchResourceData = (projectId, resourceId) => async dispatch => {
  let data = null;
  const url = `/api/mocks/${projectId}/resources/${resourceId}/data`;
  dispatch(submitForm(RESOURCE_DATA));

  try {
    data = await fetch(url, {
      headers: {'Content-Type': 'application/json', token: getToken()},
    }).then(res => res.json());
  } catch (error) {
    return dispatch(handleFormError(RESOURCE_DATA, error));
  }

  dispatch(handleFormSuccess(RESOURCE_DATA));
  dispatch({type: FETCH_SUCCESS, resourceId, data});
};

export const updateResourceData =
  (dataStr, projectId, resourceId) => async dispatch => {
    let data = null;
    const url = `/api/mocks/${projectId}/resources/${resourceId}/data`;

    dispatch(submitForm(RESOURCE_DATA));

    try {
      data = await fetch(url, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', token: getToken()},
        body: dataStr,
      }).then(res => {
        if (res.status !== 200) {
          throw new Error('Oops, something went wrong...');
        }

        return res.json();
      });
    } catch (error) {
      return dispatch(handleFormError(RESOURCE_DATA, error));
    }

    dispatch(hideForm(RESOURCE_DATA));
    dispatch({
      type: UPDATE_SUCCESS,
      resourceId,
      data,
      notification: {type: 'success', message: 'Data updated'},
    });
    dispatch(fetchProjectDetails(projectId));
  };
