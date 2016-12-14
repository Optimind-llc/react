import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
// Compnents
import Loading from '../Common/Loading';

export default class Comment extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { entries } = this.props;

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
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  entries: PropTypes.array.isRequired,
};
