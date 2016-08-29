import {
  REQUEST_SYNCINFO,
  REQUEST_SYNCINFO_SUCCESS,
  REQUEST_SYNCINFO_FAIL,
  SEND_MESSAGES,
  SEND_MESSAGES_SUCCESS,
  SEND_MESSAGES_FAIL,
  SEND_LIKE,
  SEND_LIKE_SUCCESS,
  SEND_LIKE_FAIL,
  SEND_DISLIKE,
  SEND_DISLIKE_SUCCESS,
  SEND_DISLIKE_FAIL,
  SEND_REACTION,
  SEND_REACTION_SUCCESS,
  SEND_REACTION_FAIL,
} from '../constants/DashboardActionTypes';

const initialState = {
  displayInfo: null,
  isFetching: false,
  didInvalidate: false
};

export default function displayInfo(state = initialState, action) {
  switch (action.type) {
    case REQUEST_SYNCINFO:
    case SEND_MESSAGES:
    case SEND_LIKE:
    case SEND_DISLIKE:
    case SEND_REACTION:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });

    case REQUEST_SYNCINFO_SUCCESS:
    case SEND_MESSAGES_SUCCESS:
    case SEND_LIKE_SUCCESS:
    case SEND_DISLIKE_SUCCESS:
    case SEND_REACTION_SUCCESS:
      return Object.assign({}, state, {
        displayInfo: action.payload,
        isFetching: false,
        didInvalidate: false
      });

    case REQUEST_SYNCINFO_FAIL:
    case SEND_MESSAGES_FAIL:
    case SEND_LIKE_FAIL:
    case SEND_DISLIKE_FAIL:
    case SEND_REACTION_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: true
      });

    default:
      return state;
  }
}
