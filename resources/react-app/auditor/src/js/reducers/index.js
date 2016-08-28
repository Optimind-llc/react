import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
//my reducers
import status from './status';
import application from './application';
import alert from './alert';
import disposable from './disposable';
import conference from './conference';
import displayInfo from './displayInfo';

const rootReducer = combineReducers(Object.assign({
  status, application, alert, disposable, conference, displayInfo
}, {
  routing: routeReducer
}
));

export default rootReducer;
