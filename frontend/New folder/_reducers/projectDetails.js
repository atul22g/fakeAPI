import {LOGOUT} from '../_actions/user';
import {
  FETCH,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  RESOURCE_SELECT,
} from '../_actions/projectDetails';
import {
  findResource,
  findParentResource,
  updateResources,
  deleteResource,
  updateCount,
  generateAll,
  resetCount,
} from '../App/utils/resources';
import {
  RESOURCE_CREATE_SUCCESS,
  RESOURCE_UPDATE_SUCCESS,
  RESOURCE_DELETE_SUCCESS,
  RELATION_UPDATE_SUCCESS,
} from '../_actions/resources';
import {
  GENERATE,
  GENERATE_ALL,
  RESET_ALL,
  GENERATE_SUCCESS,
  GENERATE_FAILURE,
} from '../_actions/data';
import {UPDATE_SUCCESS} from '../_actions/projects';

const STATE = {
  isFetching: false,
  error: null,
  byId: {},
  selectedResourceId: null,
};

const projectDetails = (state = STATE, action) => {
  switch (action.type) {
    case FETCH:
      return {
        ...state,
        error: null,
        isFetching: true,
      };

    case FETCH_SUCCESS: {
      return {
        error: null,
        isFetching: false,
        byId: {
          ...state.byId,
          [action.project.id]: action.project,
        },
      };
    }

    case UPDATE_SUCCESS: {
      const p = action.project;
      if (!state.byId[p.id]) return state;

      return {
        ...state,
        byId: {
          ...state.byId,
          [p.id]: {...state.byId[p.id], ...p},
        },
      };
    }

    case RESOURCE_SELECT:
      return {
        ...state,
        selectedResourceId: action.id,
      };

    case RESOURCE_CREATE_SUCCESS: {
      let nextResources = [
        ...state.byId[action.project.id].resources,
        action.resource,
      ];

      return {
        ...state,
        selectedResourceId: action.resource.id,
        byId: {
          ...state.byId,
          [action.project.id]: {
            ...state.byId[action.project.id],
            resources: nextResources,
          },
        },
      };
    }

    case RESOURCE_UPDATE_SUCCESS: {
      let nextResources = updateResources(
        action.resource,
        state.byId[action.project.id].resources
      );

      return {
        ...state,
        byId: {
          ...state.byId,
          [action.project.id]: {
            ...state.byId[action.project.id],
            resources: nextResources,
          },
        },
      };
    }

    case RESOURCE_DELETE_SUCCESS: {
      let nextResources = deleteResource(
        action.resourceId,
        state.byId[action.projectId].resources
      );

      return {
        ...state,
        selectedResourceId: null,
        byId: {
          ...state.byId,
          [action.projectId]: {
            ...state.byId[action.projectId],
            resources: nextResources,
          },
        },
      };
    }

    case RELATION_UPDATE_SUCCESS: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.projectId]: {
            ...state.byId[action.projectId],
            resources: action.resources,
          },
        },
      };
    }

    case GENERATE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.projectId]: {
            ...state.byId[action.projectId],
            resources: updateCount(
              state.byId[action.projectId].resources,
              action
            ),
          },
        },
      };

    case GENERATE_ALL:
      return {
        ...state,
        selectedResourceId: null,
        isFetching: true,
        byId: {
          ...state.byId,
          [action.projectId]: {
            ...state.byId[action.projectId],
            resources: generateAll(state.byId[action.projectId].resources),
          },
        },
      };

    case RESET_ALL:
      return {
        ...state,
        selectedResourceId: null,
        isFetching: true,
        byId: {
          ...state.byId,
          [action.projectId]: {
            ...state.byId[action.projectId],
            resources: resetCount(state.byId[action.projectId].resources),
          },
        },
      };

    case GENERATE_SUCCESS:
    case GENERATE_FAILURE:
      return {
        ...state,
        isFetching: false,
      };

    case FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case LOGOUT:
      return {...STATE};

    default:
      return state;
  }
};

export default projectDetails;
export const detailsById = (state, id) => state.byId[id];
export const getResource = (state, projectId, resourceId) => {
  const project = state.byId[projectId];
  return findResource(resourceId, project.resources);
};
export const getParentResource = (state, projectId, resourceId) => {
  const project = state.byId[projectId];
  return findParentResource(resourceId, project.resources);
};
export const getSelectedResourceId = state => state.selectedResourceId;
