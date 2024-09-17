import {getToken} from './utils';

export const FETCH = 'projectDetails/fetch';
export const FETCH_FAILURE = 'projectDetails/fetchFailure';
export const FETCH_SUCCESS = 'projectDetails/fetchSuccess';
export const RESOURCE_SELECT = 'projectDetails/selectResource';

export const fetchProjectDetails = id => async dispatch => {
  let project = null;

  dispatch({type: FETCH});

  try {
    project = await fetch(`/api/mocks/${id}`, {
      headers: {'Content-Type': 'application/json', token: getToken()},
    }).then(res => {
      if (res.status !== 200) {
        throw new Error('Oops, something went wrong...');
      }

      return res.json();
    });
  } catch (error) {
    return dispatch({
      type: FETCH_FAILURE,
      error,
      notification: {type: 'failure', message: error.message},
    });
  }

  dispatch({
    type: FETCH_SUCCESS,
    project,
  });
};

export const selectResource = id => ({type: RESOURCE_SELECT, id});
