import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
//my reducers
import application from './application';
import vote from './vote';
import alert from './alert';

const rootReducer = combineReducers(Object.assign({
  application, alert, vote
}, {
  routing: routeReducer
}
));

export default rootReducer;
