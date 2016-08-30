import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
// Config
import { SCHOOL_NAME } from '../../../config/env';
// Actions
import * as DashboardActions from '../../actions/dashboard';
// Components
import { Paper, Dialog, RaisedButton, FlatButton } from 'material-ui';
import { grey50, indigo500 } from 'material-ui/styles/colors';
import ConfirmConference from './ConfirmConference';
import MainContent from './MainContent';
import Loading from '../Common/Loading';

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    const { fetchConference, createAuditor } = props.actions;

    fetchConference(props.id);

    if (props.application.auditorCode === null) {
      createAuditor();
    }
    this.state = {
      open: true,
    };
  }

  sendReaction(type) {
    const { id, application: {auditorCode}, actions: {sendReaction} } = this.props;
    sendReaction({
      conference: id,
      token: auditorCode,
      type
    });
  }

  render() {
    const { conference } = this.props;
    const style = {
      minHeight: window.innerHeight,
      background: 'rgb(17,25,142)',
    };
    const actions = [
      <FlatButton
        label="Enter"
        primary={true}
        disabled={conference.isFetching || (conference.conference !== null && conference.conference.status == 0)}
        onClick={() => {
          this.setState({open: false});
          this.sendReaction(0);
        }}
      />
    ];

    return (
      <div className="dashboard-wrap" style={style}>
        <Dialog
          title="Confirmation"
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {conference.isFetching &&
            <div
              className="loading-wrap"
              style={{
                height: 280,
                margin: '0 -24px',
                padding: '0 15px'
              }}
            >
              <Loading/>
            </div>
          }
          <ConfirmConference conference={conference}/>
        </Dialog>
        {!this.state.open &&
          <div className="main-content">
            <Paper
              className="header"
              zDepth={1}
              style={{
                zIndex: 1001,
                height: 50,
                width: '100%',
                padding: '10px 30px 10px 30px',
                position: 'fixed',
                top: 0,
                left: 0,
                backgroundColor: 'rgb(17,25,142)',
                borderRadius: 0,
              }}
            >
              <div style={{ margin: 0 }}>
                <h1
                  style={{
                    margin: 0,
                    fontSize: '3rem',
                    textAlign: 'center',
                    lineHeight: '3rem',
                    color: 'rgba(255,255,255,1)',
                  }}
                >
                  Re:act
                </h1>
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: 5,
                  right: 10,
                  margin: 0,
                  backgroundColor: 'rgba(63, 81, 181, 0)',
                }}
              >
                <p 
                  style={{
                    float: 'left',
                    margin: '5px 5px 0 0',
                    fontSize: 10,
                    lineHeight: '10px',
                    textAlign: 'right',
                    color: 'rgba(255,255,255,.5)',
                  }}
                >
                  Supported by
                </p>
                <img
                  style={{ float: 'left' }}
                  src="/images/audience/brother-logo.png"
                  height="15px"
                />
              </div>
            </Paper>
            <Paper
              className="sub-header"
              zDepth={1}
              style={{
                zIndex: 1001,
                position: 'fixed',
                top: 50,
                left: 0,
                height: 60,
                width: '100%',
                padding: 10,
                backgroundColor: 'rgba(255,255,255,1)',
                borderRadius: 0,
              }}
            >
              <div style={{ height: 15 }}>
                <p 
                  style={{
                    float: 'left',
                    marginLeft: 10,
                    fontSize: 12,
                    color: 'rgba(17,25,142,1)',
                  }}
                >
                  {conference.conference.startAt}
                </p>
                <p 
                  style={{
                    float: 'right',
                    marginRight: 10,
                    fontSize: 12,
                    color: 'rgba(17,25,142,1)',
                  }}
                >
                  {conference.conference.place}
                </p>
              </div>
              <div style={{ height: 15 }}>
                <p 
                  style={{
                    fontSize: 18,
                    textAlign: 'center',
                    color: 'rgba(17,25,142,1)',
                    whiteSpace: 'nowrap',
                    fontWeight: 800,
                    margin: 5
                  }}
                >
                  {conference.conference.title}
                </p>
              </div>
            </Paper>
            <MainContent/>
          </div>
        }
      </div>
    );
  }
}

Dashboard.propTypes = {
  id: PropTypes.string.isRequired,
  application: PropTypes.object.isRequired,
  conference: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.params.id,
    application: state.application,
    conference: state.conference,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign({}, DashboardActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
