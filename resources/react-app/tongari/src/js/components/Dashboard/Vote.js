import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
// Config
import { BROWSER_NAME } from '../../../config/env';
// Material-ui
import { List, ListItem, Divider, Avatar, IconButton } from 'material-ui';
import { grey900, grey50, cyan500 } from 'material-ui/styles/colors';
import Loading from '../Common/Loading';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';

class Vote extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      votes: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0},
      max: 3,
      min: 0
    };
  }

  render() {
    const { entries, vote } = this.props;
    const { votes, max, min } = this.state;
    const sum = entries.reduce((a, b) => a + votes[b.id], 0);

    return (
      <div className="vote-body">
        <div className="info">
          <h2>結果投票</h2>
          <ul>
            <li>１人につき３票まで投票することが出来ます</li>
            <li>同じチームに３票全てを投票することも可能です</li>
          </ul>
          <div className="divider"></div>
          <p>残り<span>{max - sum}</span>票</p>
        </div>
        <div className="vote-wrap">
          <div className="vote">
          {
            entries.map(e =>
              <div className="entry" key={e.id}>
                <img src={`/images/tongari/entry/${e.id}.png`}/>
                <div className="introduction">
                  <p className="team">{e.team}</p>
                  <p className="title">{e.title}</p>
                </div>
                <div className="vote-btn-wrap">
                  <div className="votes">
                    <div
                      className={`add ${sum >= max ? 'disabled' : ''}`}
                      onClick={() => {
                        let newVotes = {};
                        newVotes[e.id] = votes[e.id] + 1;
                        this.setState(Object.assign(votes, newVotes));
                      }}
                    ></div>
                    <p>{votes[e.id]}<span>票</span></p>
                    <div
                      className={`sub ${(sum <= min || votes[e.id] === 0)? 'disabled' : ''}`}
                      onClick={() => {
                        let newVotes = {};
                        newVotes[e.id] = votes[e.id] - 1;
                        this.setState(Object.assign(votes, newVotes));
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )
          }

          </div>
          <div className="send">
            <button
              className={max === sum ? '' : 'disabled'}
              onClick={() => vote(votes)}
            >
              <p>投票</p>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Vote.propTypes = {
  entries: PropTypes.array.isRequired,
  vote: PropTypes.func.isRequired,
};

export default Vote;
