import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
// Config
import { BROWSER_NAME } from '../../../config/env';
// Actions
import * as DashboardActions from '../../actions/dashboard';
// Material-ui
import { List, ListItem, Divider, Avatar, IconButton } from 'material-ui';
import { grey900, grey50, cyan500 } from 'material-ui/styles/colors';
import Loading from '../Common/Loading';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';

export default class Reaction extends Component {
  constructor(props, context) {
    super(props, context);
  }

  sendReaction(type) {
    const { token, conferenceId, sendReaction } = this.props;
    sendReaction({
      token,
      conference: conferenceId,
      type
    });
  }

  render() {
    const { status, enableMessage } = this.props;

    return (
      <div className={enableMessage == 1 ? "reaction-wrap enable-message" : "reaction-wrap"}>
        <p>- 以下の２つのボタンを押してください</p>
        <p>- あなたの反応は全て匿名です</p>
        <div
          className="reaction-button-understood"
          onClick={() => this.sendReaction(1)}
        >
          <img
            src="/images/audience/ok.png"
            height="30px"
          />
          <p>Understood</p>
        </div>
        <div
          className="reaction-button-not-understood"
          onClick={() => this.sendReaction(2)}
        >
          <img
            src="/images/audience/crying.png"
            height="30px"
          />
          <p>Not Understand</p>
        </div>
      </div>
    );
  }
}

Reaction.propTypes = {
  token: PropTypes.string.isRequired,
  conferenceId: PropTypes.string.isRequired,
  messages: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  enableMessage: PropTypes.string.isRequired,
};
