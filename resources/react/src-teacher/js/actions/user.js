import * as types from '../constants/UserActionTypes';
import { CALL_API } from '../middleware/fetchMiddleware';
import { push } from 'react-router-redux';
// Config
import { CONNECTION_NAME } from '../../config/env';

export function fetchInfo(connection) {
  return {
    [CALL_API]: {
      types: [
        types.REQUEST_USER_INFORMATION,
        types.REQUEST_USER_INFORMATION_SUCCESS,
        types.REQUEST_USER_INFORMATION_FAIL
      ],
      endpoint: `user/info?connection_name=${CONNECTION_NAME}`,
      method: 'GET',
      body: null
    }
  };
}
