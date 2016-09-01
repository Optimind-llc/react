import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
// Config
import { BROWSER_NAME } from '../../../config/env';
// Actions
import * as DashboardActions from '../../actions/dashboard';
// Material-ui
import { grey900, grey50, cyan500 } from 'material-ui/styles/colors';
import Message from './Message';
import Reaction from './Reaction';

class MainContent extends Component {
  constructor(props, context) {
    super(props, context);
    const { application, conference, actions: {syncInfo} } = props;

    syncInfo({
      token: application.auditorCode,
      conference: conference.conference.id
    });

    this.state = {
      intervalId: null,
      interval: 1000,
      innerHeight: window.innerHeight
    };
  }

  componentDidMount() {
    const { application, conference, actions: {syncInfo} } = this.props;
    const intervalId = setInterval(()=> {
      syncInfo({
        token: application.auditorCode,
        conference: conference.conference.id
      });
    }, this.state.interval);

    this.setState({intervalId});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    const { status, conference, application, displayInfo, actions} = this.props;

    return (
      <div className="">
        {
          displayInfo.displayInfo &&
          displayInfo.displayInfo.setting.enableReaction == 1 &&
          <Reaction
            conferenceId={conference.conference.id}
            token={application.auditorCode}
            status={status}
            sendReaction={actions.sendReaction}
            enableMessage={displayInfo.displayInfo.setting.enableMessage}
          />
        }
        {
          displayInfo.displayInfo &&
          displayInfo.displayInfo.setting.enableMessage == 1 &&
          <Message
            conferenceId={conference.conference.id}
            token={application.auditorCode}
            messages={displayInfo.displayInfo.messages}
            status={status}
            sendMessages={actions.sendMessages}
            sendLike={actions.sendLike}
            sendDislike={actions.sendDislike}
            enableReaction={displayInfo.displayInfo.setting.enableReaction}
          />
        }
      </div>
    );
  }
}

MainContent.propTypes = {
  application: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  conference: PropTypes.object.isRequired,
  displayInfo: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  console.log(state)
  return {
    application: state.application,
    status: state.status,
    conference: state.conference,
    displayInfo: state.displayInfo,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign({}, DashboardActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
