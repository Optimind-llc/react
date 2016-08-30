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

class Message extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      rem: 10,
      innerHeight: window.innerHeight,
      textareaHeight: 26,
      text: '',
      focus: false
    };
  }

  // componentDidUpdate(prevProps) {
  //   const { sendMessage } = this.props.status;
  //   if (prevProps.status.sendMessage.isFetching && !sendMessage.isFetching) {
  //     const element = document.getElementById("messages");
  //     element.scrollTop = element.scrollHeight;
  //   }
  // }

  sendMessage() {
    const { token, conferenceId, sendMessages } = this.props;
    const { text } = this.state;
    sendMessages({
      conference: conferenceId,
      token,
      text
    });
    this.setState({
      textareaHeight: 26,
      text: ''
    });
  }

  sendLike(id) {
    const { token, conferenceId, sendLike, status } = this.props;
    if (!status.like.isFetching) {
      sendLike({
        token,
        message: id
      });
    }
  }

  sendDislike(id) {
    const { token, conferenceId, sendDislike, status } = this.props;
    if (!status.dislike.isFetching) {
      sendDislike({
        token,
        message: id
      }); 
    }
  }

  render() {
    const { status, messages, enableReaction } = this.props;
    const { textareaHeight } = this.state;

    return (
      <div className="message-wrap">
        <div
          id="messages"
          className={enableReaction == 1 ? "messages enable-reaction" : "messages"}
          style={{
            height: enableReaction == 1 ?
              this.state.innerHeight - 300 :
              this.state.innerHeight - 94
            }}
        >
        {
          messages.map((m, i, self) =>
            <div className="message-node">
              <div
                className="likes-wrap"
                onClick={() => {
                  m.liked ?
                  this.sendDislike(m.id) :
                  this.sendLike(m.id)
                }}
              >
                <div className="likes-icon">
                  <ActionThumbUp
                    color={m.liked ? cyan500 : grey900}
                    style={{
                      margin: '0 8px 0 8px',
                      height: 22,
                      opacity: m.id === status.like.id || m.id === status.dislike.id ? 0.4 : 1
                    }}
                  />
                </div>
                <p
                  className="like-message"
                  style={{
                    color: m.liked ? cyan500 : grey900,
                    opacity: m.id === status.like.id || m.id === status.dislike.id ? 0.4 : 1
                  }}
                >
                  Like it!
                </p>
                <p className="likes">{m.likes}</p>
              </div>
              <div className="message-text">
                {m.text.split(/[\n\r]/).map(t =>
                  <p>{t}</p>
                )}
              </div>
              <div className="message-info">
                <div>{`No.${self.length - i}`}</div>
                <div>{`${Math.abs(moment.unix(m.time).diff(moment(), 'minutes'))} 分前`}</div>
              </div>
            </div>
          )
        }
        </div>

        <div style={{height: 20 + textareaHeight}}></div>

        <div className="message-form">
          <textarea
            id="text"
            name="body"
            wrap="soft"
            value={this.state.text}
            style={{ height: textareaHeight }}
            onFocus={(e) => {
              window.scrollTo(0, document.body.scrollHeight)
              let scrollHeight = e.target.scrollHeight;
              this.setState({
                focus: true,
                textareaHeight: scrollHeight > 26*4 ? 26*4 : scrollHeight,
              })
            }}
            onBlur={() => this.setState({
              focus: false,
              textareaHeight: 26,
            })}
            onChange={(e) => {
              window.scrollTo(0, document.body.scrollHeight)
              let scrollHeight = e.target.scrollHeight;
              let value = e.target.value;
              this.setState({
                textareaHeight: scrollHeight > 26*4 ? 26*4 : scrollHeight,
                text: typeof value === 'undefined' ? '' : value
              })
            }}
          >
          </textarea>
          <div
            className="message-submit"
            style={{
              marginTop: textareaHeight - 26,
              opacity: this.state.text.length === 0 && this.state.focus ? 0.4 : 1,
              pointerEvents: this.state.text.length === 0 ? 'none' : 'auto'
            }}
            onClick={() => this.sendMessage()}
          >
            <p>送信</p>
          </div>
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  token: PropTypes.string.isRequired,
  conferenceId: PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired,
  status: PropTypes.object.isRequired,
  enableReaction: PropTypes.string.isRequired,
};

export default Message;
