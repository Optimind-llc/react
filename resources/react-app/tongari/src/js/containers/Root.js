import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Redirect } from 'react-router';
import { Provider, connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
//import DevTools from './DevTools';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Config
import { SCHOOL_NAME } from '../../config/env';
//Components
import App from './App';
import Dashboard from '../components/Dashboard/Dashboard';

class Root extends Component {
  render() {
    const { history, store } = this.props;
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route name="Top" path="tongali" component={App}>
            <Route path="vote" component={Dashboard}/>
          </Route>
        </Router>
        {/*<DevTools/>*/}
      </Provider>
    );
  }
}

Root.propTypes = {};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Root);
