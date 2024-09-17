import {combineReducers} from 'redux';
import notifications from './notifications';
import user from './user';
import projects from './projects';
import forms from './forms';
import projectDetails from './projectDetails';
import data from './data';

export default combineReducers({
  notifications,
  projects,
  projectDetails,
  user,
  forms,
  data,
});
