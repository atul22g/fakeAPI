import {DELETE_RESOURCE, EDIT_RESOURCE, NEW_RESOURCE} from '../reducers/forms';
import {handleFormError, hideForm, submitForm} from './forms';

import {getToken} from './utils';
import {notify} from './notifications';

export const RESOURCE_CREATE_SUCCESS = 'resources/createSuccess';
export const RESOURCE_UPDATE_SUCCESS = 'resources/updateSuccess';
export const RESOURCE_DELETE_SUCCESS = 'resources/deleteSuccess';
export const RELATION_UPDATE_SUCCESS = 'resources/relationUpdateSuccess';

export const createResource = (resource, projectId) => async dispatch => {
  let json = null;
  let status = null;
  const url = `/api/mocks/${projectId}/resources`;
  dispatch(submitForm(NEW_RESOURCE));

  try {
    json = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', token: getToken()},
      body: JSON.stringify({
        name: resource.name,
        generator: resource.generator,
        endpoints: resource.endpoints,
        resourceSchema: resource.schema,
      }),
    }).then(res => {
      status = res.status;
      return res.json();
    });
  } catch (error) {
    return dispatch(handleFormError(NEW_RESOURCE, error));
  }

  if (status !== 200) {
    dispatch(notify({type: 'failure', message: 'Error creating resource'}));
    return dispatch(
      handleFormError(
        NEW_RESOURCE,
        new Error(
          typeof json === 'string' ? json : 'Oops, something went wrong...'
        )
      )
    );
  }

  dispatch(hideForm(NEW_RESOURCE));
  dispatch({
    type: RESOURCE_CREATE_SUCCESS,
    project: {id: projectId},
    resource: {...json, count: 0},
    notification: {type: 'success', message: 'Resource created'},
  });
};

export const updateResource = (resource, projectId) => async dispatch => {
  let json = null;
  let status = null;
  const url = `/api/mocks/${projectId}/resources/${resource.id}`;
  dispatch(submitForm(EDIT_RESOURCE));

  try {
    json = await fetch(url, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json', token: getToken()},
      body: JSON.stringify({
        name: resource.name,
        generator: resource.generator,
        endpoints: resource.endpoints,
        resourceSchema: resource.schema,
      }),
    }).then(res => {
      status = res.status;
      return res.json();
    });
  } catch (error) {
    return dispatch(handleFormError(EDIT_RESOURCE, error));
  }

  if (status !== 200) {
    dispatch(notify({type: 'failure', message: 'Error updating resource'}));
    return dispatch(
      handleFormError(
        EDIT_RESOURCE,
        new Error(
          typeof json === 'string' ? json : 'Oops, something went wrong...'
        )
      )
    );
  }

  dispatch(hideForm(EDIT_RESOURCE));
  dispatch({
    type: RESOURCE_UPDATE_SUCCESS,
    project: {id: projectId},
    resource: {
      id: json.id,
      generator: json.generator,
      endpoints: json.endpoints,
      resourceSchema: json.resourceSchema,
    },
    notification: {type: 'success', message: 'Resource updated'},
  });
};

export const deleteResource = (resourceId, projectId) => async dispatch => {
  const url = `/api/mocks/${projectId}/resources/${resourceId}`;
  dispatch(submitForm(DELETE_RESOURCE));

  try {
    await fetch(url, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json', token: getToken()},
    }).then(res => {
      if (res.status !== 200) {
        throw new Error('Oops, something went wrong...');
      }
    });
  } catch (error) {
    return dispatch(handleFormError(DELETE_RESOURCE, error));
  }

  dispatch(hideForm(NEW_RESOURCE)); // set prompt to false
  dispatch(hideForm(DELETE_RESOURCE));
  dispatch({
    type: RESOURCE_DELETE_SUCCESS,
    projectId,
    resourceId,
    notification: {type: 'success', message: 'Resource deleted'},
  });
};

export const updateRelation =
  ({projectId, sourceId, destinationId, clone, callback}) =>
  async dispatch => {
    let json = null;
    const url = `/api/mocks/${projectId}/resources/update_relation`;

    try {
      json = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', token: getToken()},
        body: JSON.stringify({sourceId, destinationId, clone}),
      }).then(res => {
        if (res.status !== 200) {
          throw new Error(
            res.status === 402
              ? "Looks like you don't have a subscription"
              : 'Failed to updated resource tree'
          );
        }
        return res.json();
      });
    } catch (error) {
      callback();
      return dispatch(
        notify({type: 'failure', message: 'Oops, something went wrong...'})
      );
    }

    dispatch({
      type: RELATION_UPDATE_SUCCESS,
      projectId,
      resources: json.resources,
      notification: {type: 'success', message: 'Resource tree updated'},
    });
    callback();
  };

export const addToRoot =
  ({projectId, sourceId, clone, callback}) =>
  async dispatch => {
    let json = null;
    const url = `/api/mocks/${projectId}/resources/add_to_root`;

    try {
      json = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', token: getToken()},
        body: JSON.stringify({sourceId, clone}),
      }).then(res => {
        if (res.status !== 200) {
          throw new Error(
            res.status === 402
              ? "Looks like you don't have a subscription"
              : 'Failed to updated resource tree'
          );
        }
        return res.json();
      });
    } catch (error) {
      callback();
      return dispatch(
        notify({type: 'failure', message: 'Oops, something went wrong...'})
      );
    }

    dispatch({
      type: RELATION_UPDATE_SUCCESS,
      projectId,
      resources: json.resources,
      notification: {type: 'success', message: 'Resource tree updated'},
    });
    callback();
  };
