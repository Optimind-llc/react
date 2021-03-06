import * as types from '../constants/DashboardActionTypes';
import { ADD_SIDE_ALERT } from '../constants/ActionTypes';
import { CALL_API } from '../middleware/fetchMiddleware';
import { push } from 'react-router-redux';
// Config
import { CONNECTION_NAME } from '../../config/env';

export function fetchCharts() {
  return {
    [CALL_API]: {
      types: [
        types.REQUEST_CHARTS,
        types.REQUEST_CHARTS_SUCCESS,
        types.REQUEST_CHARTS_FAIL
      ],
      endpoint: `test?connection_name=${CONNECTION_NAME}`,
      method: 'GET',
      body: null
    }
  };
}

export function fetchMessages() {
  return {
    [CALL_API]: {
      types: [
        types.REQUEST_MESSAGES,
        types.REQUEST_MESSAGES_SUCCESS,
        types.REQUEST_MESSAGES_FAIL
      ],
      endpoint: (state) => {
        const messages = state.dashboardMessages.dashboardMessages;
        if (messages.length === 0) {
          return `messages/?latest=0&connection_name=${CONNECTION_NAME}`
        }
        else {
          return `messages/?latest=${messages[0].time}&connection_name=${CONNECTION_NAME}`
        }
      },
      method: 'GET',
      body: null
    }
  };
}



export function fetchChartsTest() {
  return {
    [CALL_API]: {
      types: [
        types.REQUEST_CHARTS_TEST,
        types.REQUEST_CHARTS_TEST_SUCCESS,
        types.REQUEST_CHARTS_TEST_FAIL
      ],
      endpoint: 'test2',
      method: 'GET',
      body: null
    }
  };
}
