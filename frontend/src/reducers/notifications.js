import {CLEAR} from '../actions/notifications';
let n = 1;

const notifications = (state = [], action) => {
  if (action.notification) {
    return [{...action.notification, id: n++}];
  }

  if (action.type === CLEAR) {
    return [];
  }

  return state;
};

export default notifications;
