import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
// Actions
import * as DashboardActions from '../../actions/dashboard';
// Components
import Vote from './Vote';
import Comment from './Comment';
import Loading from '../Common/Loading';

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    const { createAuditor } = props.actions;

    this.state = {
      votes: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0},
      max: 3,
      min: 0
    };
  }

  vote(body) {
    const { vote } = this.props.actions;
    vote(body);
  }

  render() {
    const { application } = this.props
    const entries = [
      {id: 1, team: 'チーム名①', title: 'アイデアのタイトル①'},
      {id: 2, team: 'チーム名②', title: 'アイデアのタイトル②'},
      {id: 3, team: 'チーム名③', title: 'アイデアのタイトル③'},
      {id: 4, team: 'チーム名④', title: 'アイデアのタイトル④'},
      {id: 5, team: 'チーム名⑤', title: 'アイデアのタイトル⑤'},
      {id: 6, team: 'チーム名⑥', title: 'アイデアのタイトル⑥'},
      {id: 7, team: 'チーム名⑦', title: 'アイデアのタイトル⑦'},
      {id: 8, team: 'チーム名⑧', title: 'アイデアのタイトル⑧'}
    ];

    return (
      <div className="dashboard-wrap">
        <div className="header">
          <img src="/images/tongari/logo.png"/>
        </div>
        {
          application.voted ?
          <Comment
            entries={entries}
          /> :
          <Vote
            entries={entries}
            vote={(body) => this.vote(body)}
          />
        }
      </div>
    );
  }
}

Dashboard.propTypes = {
  application: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    application: state.application
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign({}, DashboardActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
