import { LOCALE } from '../../config/env';
import {
  VOTE,
  VOTE_SUCCESS,
  VOTE_FAIL
} from '../constants/DashboardActionTypes';

const initialState = {
  data: null,
  message: '',
  isFetching: false,
  didInvalidate: false
};

export default function vote(state = initialState, action) {
  switch (action.type) {
    case VOTE:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });

    case VOTE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false
      });

    case VOTE_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: true
      });

    default:
      return state;
  }
}
