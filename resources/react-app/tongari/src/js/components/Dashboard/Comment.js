import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
// Compnents
import Loading from '../Common/Loading';

export default class Comment extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selected: 1,
      text: ''
    };
  }

  render() {
    const { entries, sendMessage, message } = this.props;

    return (
      <div className="">
        <div className="comment-body">
          <div className="info">
            <h2>投票ありがとうございました</h2>
            <ul>
              <li>各チームに対してコメントを投稿できます</li>
              <li>審査員のコメントともに紹介させていただきます</li>
            </ul>
          </div>
          <div className="comment-wrap">
            {
              message === 'success' &&
              <p>送信が成功しました。続けてコメントできます。</p>
            }
            <div className="styled-select yellow rounded">
              <select value={this.state.selected} onChange={e => this.setState({selected: e.target.value})}>
              {
                entries.map(e =>
                  <option value={e.id}>{e.title}</option>
                )
              }
              </select>
            </div>
            <textarea
              rows="4"
              cols="40"
              value={this.state.text}
              onChange={e => this.setState({text: e.target.value})}
            />
            <button
              onClick={() => sendMessage({
                text: this.state.text,
                team: this.state.selected
              })}
            >
              送信
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  entries: PropTypes.array.isRequired,
  message: PropTypes.string.isRequired,
  sendMessage: PropTypes.func.isRequired
};
