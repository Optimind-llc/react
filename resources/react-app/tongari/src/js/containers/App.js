import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Config
import { SCHOOL_NAME } from '../../config/env';
// Actions
import * as InitializeActions from '../actions/initialize';
import { push } from 'react-router-redux';
// Components

class App extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { children } = this.props;

    return (
      <div id="container">
        {children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  alerts: PropTypes.array,
  routing: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    alerts: state.alert,
    routing: ownProps
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(
    InitializeActions,
    { push: push }
  );

  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
