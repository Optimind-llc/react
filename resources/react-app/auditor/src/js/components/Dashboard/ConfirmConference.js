import React, { PropTypes, Component } from 'react';
import {Motion, spring} from 'react-motion';

class ConfirmConference extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { conference } = this.props.conference;

    return (
      <div className="space-top-4 space-bottom-3">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="list-head">Title</span>
            <span className="list-body">{conference !== null ? conference.title : ''}</span>
          </li>
          <li className="list-group-item">
            <span className="list-head">Place</span>
            <span className="list-body">{conference !== null ? conference.place : ''}</span>
          </li>
          <li className="list-group-item">
            <span className="list-head">Start at</span>
            <span className="list-body">{conference !== null ? conference.startAt : ''}</span>
          </li>
        </ul>
      </div>
    );
  }
}

ConfirmConference.propTypes = {
  conference: PropTypes.object.isRequired
};

export default ConfirmConference;
