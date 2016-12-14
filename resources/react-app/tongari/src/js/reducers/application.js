import { LOCALE } from '../../config/env';
import {
  CREATE_AUDITOR,
  CREATE_AUDITOR_SUCCESS,
  CREATE_AUDITOR_FAIL,
  VOTE_SUCCESS
} from '../constants/DashboardActionTypes';

const initialState = {
  auditorCode: null,
  voted: false,
  isFetching: false,
  didInvalidate: false
};

export default function application(state = initialState, action) {
  switch (action.type) {
    case CREATE_AUDITOR:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });

    case CREATE_AUDITOR_SUCCESS:
      return Object.assign({}, state, {
        auditorCode: action.payload.code,
        isFetching: false,
        didInvalidate: false
      });

    case CREATE_AUDITOR_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: true
      });

    case VOTE_SUCCESS:
      return Object.assign({}, state, {
        voted: true
      });

    default:
      return state;
  }
}
