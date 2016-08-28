import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Redirect } from 'react-router';
import { Provider, connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
//import DevTools from './DevTools';
import * as i18n from '../../local';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Config
import { SCHOOL_NAME } from '../../config/env';
//Components
import App from './App';

import ConferenceDashboard from '../components/Conference/Dashboard/Dashboard';
import Conferences from '../components/Conference/Conference/Conferences/Conferences';
import CreateConference from '../components/Conference/Conference/CreateConference/CreateConference';


import Student from '../components/Dashboard/Student';
import Dashboard from '../components/Dashboard/Dashboard';
import Lecture from '../components/Lecture/Lecture';
import Lectures from '../components/Lecture/Lectures/Lectures';
import ViewLecture from '../components/Lecture/ViewLecture/ViewLecture';
import CreateLecture from '../components/Lecture/CreateLecture/CreateLecture';
import User from '../components/User/User';
import Profile from '../components/User/Profile';

class Root extends Component {
  render() {
    const { history, store, locale } = this.props;
    return (
      <Provider store={store}>
        <IntlProvider key="intl" locale={'ja'} messages={i18n.ja}>
          <Router history={history}>

            <Route path="conference/teacher/student" component={Student}/>
            <Route name="Top" path="/conference/teacher" component={App}>
              <Route path="dashboard" component={ConferenceDashboard}/>
              <Route name="Lectures" path="lectures" component={Lecture}>
                <IndexRoute name="All" component={Conferences}/>
                <Route name="Create Lecture" path="create" component={CreateConference}/>
                <Route name="View Lecture" path=":id" component={ViewLecture}/>
              </Route>
              <Route name="User" path="user" component={User}>
                <IndexRoute name="All" component={Profile}/>
                <Route name="profile" path="profile" component={Profile}/>
              </Route>
            </Route>

            <Route path={`/${SCHOOL_NAME}/teacher/student`} component={Student}/>
            <Route name="Top" path={`/${SCHOOL_NAME}/teacher`} component={App}>
              <Route path="dashboard" component={Dashboard}/>
              <Route name="Lectures" path="lectures" component={Lecture}>
                <IndexRoute name="All" component={Lectures}/>
                <Route name="Create Lecture" path="create" component={CreateLecture}/>
                <Route name="View Lecture" path=":id" component={ViewLecture}/>
              </Route>
              <Route name="User" path="user" component={User}>
                <IndexRoute name="All" component={Profile}/>
                <Route name="profile" path="profile" component={Profile}/>
              </Route>
            </Route>
          </Router>
        </IntlProvider>
        {/*<DevTools/>*/}
      </Provider>
    );
  }
}

Root.propTypes = {
  locale: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    locale: state.application.locale
  };
}

export default connect(mapStateToProps)(Root);
