import { LOCALE } from '../../config/env';
import {
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL
} from '../constants/DashboardActionTypes';

const initialState = {
  message: '',
  isFetching: false,
  didInvalidate: false
};

export default function message(state = initialState, action) {
  switch (action.type) {
    case SEND_MESSAGE:
      return Object.assign({}, state, {
        message: '',
        isFetching: true,
        didInvalidate: false
      });

    case SEND_MESSAGE_SUCCESS:
      return Object.assign({}, state, {
        message: action.payload.message,
        isFetching: false,
        didInvalidate: false
      });

    case SEND_MESSAGE_FAIL:
      return Object.assign({}, state, {
        message: '',
        isFetching: false,
        didInvalidate: true
      });

    default:
      return state;
  }
}
