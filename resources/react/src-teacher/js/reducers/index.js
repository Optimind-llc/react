import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routeReducer } from 'react-router-redux';
//my reducers
import application from './application';
import alert from './alert';
import user from './user';
// import disposable from './disposable';
// import users from './users';
// import roles from './roles';
// import permissions from './permissions';
// import dependency from './dependency';
// import pins from './pins';
// import timetables from './flight/timetables';
// import plans from './flight/plans';
// import types from './flight/types';
// import places from './flight/places';
// import fetchingNodes from './flight/fetchingNodes';

//reducers/index.jsから全てのreducerを取得しformReducer,routeReducerとcombine
const rootReducer = combineReducers(Object.assign({
  application, alert, user
}, {
  form: formReducer,
  routing: routeReducer
}
));

export default rootReducer;
