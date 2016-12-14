import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
//my reducers
import application from './application';
import vote from './vote';
import message from './message';
import alert from './alert';

const rootReducer = combineReducers(Object.assign({
  application, alert, vote, message
}, {
  routing: routeReducer
}
));

export default rootReducer;
