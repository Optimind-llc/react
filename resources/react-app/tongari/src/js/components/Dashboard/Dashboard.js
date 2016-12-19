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

    createAuditor();
  }

  vote(votes) {
    const { application, actions } = this.props;
    actions.vote({votes: votes, id: application.auditorCode});
  }

  sendMessage(message) {
    const { application, actions } = this.props;
    actions.sendMessage({
      message: message,
      id: application.auditorCode
    });
  }

  render() {
    const { application, message } = this.props
    const entries = [
      {id: 1, team: 'entry #1', title: '錯覚介護　～あのあたりを探してみたら～'},
      {id: 2, team: 'entry #2', title: 'Fashion×Tech！Mirror Shoppingで世界中の服をあなたに'},
      {id: 3, team: 'entry #3', title: '「英会話のZAZA ～あなただけの先生を。～」マンツーマン英会話マッチングプラットフォーム'},
      {id: 4, team: 'entry #4', title: 'I’m here.～永遠に感じることのできる親子の絆～'},
      {id: 5, team: 'entry #5', title: 'レゴを用いたデイケア施設利用者のための認知機能の維持発展'},
      {id: 6, team: 'entry #6', title: 'サムライチェーン'},
      {id: 7, team: 'entry #7', title: '垂直統合モデル構築によるカンボジアでのアパレル事業'},
      {id: 8, team: 'entry #8', title: '楽しんで！味わって！みんなで食の物語を築くサイト-Kodawarin-'},
      {id: 9, team: 'entry #9', title: 'S.F.R(Student FandRaising)'},
      {id: 10, team: 'entry #10', title: 'MY Beauty Adviser ―毎朝、心浮き立つメイクアップを―'},
      {id: 11, team: 'entry #11', title: 'スマートフォンを用いた超小型AED（自動体外除細動器）の製作並びに普及'},
      {id: 12, team: 'entry #12', title: '外国人留学生の就業支援サービス“Job Tree Japan“'},
      {id: 13, team: 'entry #13', title: 'アイドルコンサートによる混雑情報提供サービス'}
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
            message={message.message}
            sendMessage={(message) => this.sendMessage(message)}
          /> :
          <Vote
            entries={entries}
            vote={(votes) => this.vote(votes)}
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
    application: state.application,
    message: state.message,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign({}, DashboardActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
