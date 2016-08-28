import {
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
  sendMessage: {
    isFetching: false,
    didInvalidate: false
  },
  like: {
    id: null,
    isFetching: false,
    didInvalidate: false
  },
  dislike: {
    id: null,
    isFetching: false,
    didInvalidate: false
  },
  reactions: {
    type: 1,
    isFetching: false,
    didInvalidate: false
  }
};

export default function status(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'SEND_MESSAGES':
      return Object.assign({}, state, {
        sendMessage: {
          isFetching: true,
          didInvalidate: false
        }
      });

    case 'SEND_MESSAGES_SUCCESS':
      return Object.assign({}, state, {
        sendMessage: {
          isFetching: false,
          didInvalidate: false
        }
      });

    case 'SEND_MESSAGES_FAIL':
      return Object.assign({}, state, {
        sendMessage: {
          isFetching: false,
          didInvalidate: true
        }
      });

    case 'SEND_LIKE':
      return Object.assign({}, state, {
        like: {
          id: payload.message,
          isFetching: true,
          didInvalidate: false
        }
      });

    case 'SEND_LIKE_SUCCESS':
      return Object.assign({}, state, {
        like: {
          id: null,
          isFetching: false,
          didInvalidate: false
        }
      });

    case 'SEND_LIKE_FAIL':
      return Object.assign({}, state, {
        like: {
          id: null,
          isFetching: false,
          didInvalidate: true
        }
      });

    case 'SEND_DISLIKE':
      return Object.assign({}, state, {
        dislike: {
          id: payload.message,
          isFetching: true,
          didInvalidate: false
        }
      });

    case 'SEND_DISLIKE_SUCCESS':
      return Object.assign({}, state, {
        dislike: {
          id: null,
          isFetching: false,
          didInvalidate: false
        }
      });

    case 'SEND_DISLIKE_FAIL':
      return Object.assign({}, state, {
        dislike: {
          id: null,
          isFetching: false,
          didInvalidate: true
        }
      });

    case 'SEND_REACTION':
      return Object.assign({}, state, {
        reactions: {
          type: 1,
          isFetching: true,
          didInvalidate: false
        }
      });

    case 'SEND_REACTION_SUCCESS':
      console.log('in status reducer action = ', action);
      return Object.assign({}, state, {
        reactions: {
          type: 1,
          isFetching: false,
          didInvalidate: false
        }
      });

    case 'SEND_REACTION_FAIL':
      return Object.assign({}, state, {
        reactions: {
          type: 1,
          isFetching: false,
          didInvalidate: true
        }
      });

    default:
      return state;
  }
}
