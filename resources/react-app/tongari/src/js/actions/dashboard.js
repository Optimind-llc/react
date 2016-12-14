import * as types from '../constants/DashboardActionTypes';
import { ADD_SIDE_ALERT } from '../constants/ActionTypes';
import { CALL_API } from '../middleware/fetchMiddleware';
import { push } from 'react-router-redux';

export function createAuditor() {
  return {
    [CALL_API]: {
      types: [
        types.CREATE_AUDITOR,
        types.CREATE_AUDITOR_SUCCESS,
        types.CREATE_AUDITOR_FAIL
      ],
      endpoint: 'create/auditor',
      method: 'GET',
      body: null
    }
  };
}

export function vote(body) {
  return {
    [CALL_API]: {
      types: [
        types.VOTE,
        types.VOTE_SUCCESS,
        types.VOTE_FAIL
      ],
      endpoint: 'vote',
      method: 'POST',
      body
    }
  };
}

export function sendMessage(body) {
  return {
    [CALL_API]: {
      types: [
        types.SEND_MESSAGE,
        types.SEND_MESSAGE_SUCCESS,
        types.SEND_MESSAGE_FAIL
      ],
      endpoint: 'message/send',
      method: 'POST',
      body
    }
  };
}
