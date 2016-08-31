import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
// Config
import { SCHOOL_NAME } from '../../../../config/env';
// Actions
import * as DashboardActions from '../../../actions/dashboard';
import * as LectureActions from '../../../actions/lecture';
// Components
import { RaisedButton, Tabs, Tab, LeftNav, Toggle } from 'material-ui';
import { Paper } from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';
import PieCharts from './PieCharts';
import LineChart from './LineChart';
import Message from './Message';
import SortedMessage from './SortedMessage';

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    const { fetchMessages, fetchCharts } = props.actions;
    fetchMessages();
    fetchCharts();
    this.state = {
      intervalId: null,
      interval: 10000,
      value: 'newest',
      rightSetting: false,
      ReactionToggled: false,
      MessageToggled: false,
    };
  }

  componentDidMount() {
    const { fetchCharts, fetchMessages } = this.props.actions;
    const intervalId = setInterval(()=> {
      fetchCharts();
      fetchMessages();
    }, this.state.interval);
    this.setState({intervalId});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  handleChange(value) {
    this.setState({
      value: value,
    });
  };

  openWindow() {
    window.open(
      `/${SCHOOL_NAME}/teacher/student`,
      '_blank',
      'top=50,left=50,width=1200,height=650,scrollbars=1,location=0,menubar=0,toolbar=0,status=1,directories=0,resizable=1'
    );
  }

  render() {
    const { charts, messages, actions } = this.props;
    const style = {
      minHeight: window.innerHeight - 64,
      background: Colors.grey50,
      padding: '0 60px 60px'
    };

    var effectiveTime = 60000;

    var reactions = charts.reactions;
    var timestamp = new Date().getTime();
    var attendance, understood, notUnderstand;

    if (charts.exist) {
      attendance = reactions.map(r => r.auditorId).filter((r, i, self) => self.indexOf(r) === i).length,
      understood = reactions.filter(r => {
        return r.type == 1 &&  timestamp - (Number(r.createdAt) * 1000) <= effectiveTime
      }).map(r => r.auditorId).filter((r, i, self) => self.indexOf(r) === i).length
      notUnderstand = reactions.filter(r => {
        return r.type == 2 &&  timestamp - (Number(r.createdAt) * 1000) <= effectiveTime
      }).map(r => r.auditorId).filter((r, i, self) => self.indexOf(r) === i).length
    }

    var imageName;

    if (charts.exist) {
      if (charts.conference.enableReaction == 1 && charts.conference.enableMessage == 1) {
        imageName = 'reaction-message';
      } else if (charts.conference.enableReaction == 1 && charts.conference.enableMessage == 0) {
        imageName = 'reaction';
      } else if (charts.conference.enableReaction == 0 && charts.conference.enableMessage == 1) {
        imageName = 'message';
      } else {
        imageName = 'none';
      }
    }
    const styles = {
      line: {
        backgroundColor: 'rgb(17, 25, 142)',
        paddingTop: 16,
        margin: '0 auto',
        fontSize: 24,
        fontWeight: 400,
        textAlign: 'center',
        color: 'white',
      },
      block: {
        maxWidth: 250,
        margin: '10px auto 50px',
      },
      toggle: {
        marginBottom: 10,
      },
    }

    return (
      <div style={style}>
        <section className="content-header">
        </section>

        <LeftNav width={400} openRight={true} open={this.state.rightSetting}>
          {
            charts.exist &&
            <div className="cliant-setting">
              <div style={styles.block}>
                <Toggle
                  label="Reaction"
                  style={styles.toggle}
                  toggled={charts.conference.enableReaction == 1 ? true : false}
                  onToggle={(f, bool) => {
                    actions.updateLectureSetting(charts.conference.id, {enableReaction: bool});
                  }}
                />
                <Toggle
                  label="Send Message"
                  style={styles.toggle}
                  toggled={charts.conference.enableMessage == 1 ? true : false}
                  onToggle={(f, bool) => {
                    actions.updateLectureSetting(charts.conference.id, {enableMessage: bool});
                  }}
                />
              </div>
              <div id="iphone5s" className="silver">
                  <div className="device">
                      <div className="inner"></div>
                      <div className="sleep"></div>
                      <div className="volume"></div>
                      <div className="camera"></div>
                      <div className="top-bar"></div>
                      <div className="sensor"></div>
                      <div className="speaker"></div>
                      <div className="screen">
                          <img src={`/images/teacher/${imageName}.jpeg`} alt=""/>
                      </div>
                      <div className="bottom-bar"></div>
                      <div className="start"></div>
                  </div>
              </div>
            </div>
          }
          <RaisedButton
            style={{
              width: '100%',
              margin: 0,
              padding: 0,
              position : 'absolute',
              bottom: 0,
            }}
            label="完了"
            labelColor={"white"}
            backgroundColor={'rgb(17, 25, 142)'}
            onClick={() => this.setState({rightSetting: false})}
          />
        </LeftNav>

        <section className="content">
          <div>
            <div className="row">
              <div className="panel panel-default room-info-wrap">
                <div className="panel-heading">
                  <div className="row">
                    <div className="pull-left room-key-wrap">
                      <p><span></span><span>{charts.exist ? charts.conference.title : ''}</span></p>
                    </div>
                    <RaisedButton
                      style={{width: 150, marginRight: 20, float:'right'}}
                      label="設定"
                      backgroundColor={'rgb(0, 188, 212)'}
                      onClick={() => this.setState({rightSetting: true})}
                    />
                    <RaisedButton
                      style={{width: 150, marginRight: 20, float:'right'}}
                      label="終了"
                      backgroundColor={'rgb(0, 188, 212)'}
                      onClick={() => {}}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-7">
                <div className="row">
                  <PieCharts pie={{
                    attendance: attendance,
                    understood: understood,
                    notUnderstand: notUnderstand
                  }}/>
                </div>
                <div className="row">
                  {charts.exist &&
                    <LineChart
                      reactions={charts.reactions}
                      startAt={charts.conference.startAt}
                    />
                  }
                </div>
              </div>
              <div className="col-md-5">
                <div className="row" style={{marginLeft: 10}}>
                  <h2 style={styles.line}>メッセージ</h2>
                  <Tabs
                    value={this.state.value}
                    onChange={(value) => this.setState({
                      value: value
                    })}
                  >
                    <Tab label="新着順" value="newest" >
                      <Message messages={messages} name={true}/>
                    </Tab>
                    <Tab label="人気順" value="popularity">
                      <SortedMessage messages={messages} name={true}/>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

Dashboard.propTypes = {
};

function mapStateToProps(state, ownProps) {
  return {
    charts: state.dashboardCharts,
    messages: state.dashboardMessages,
    routes: ownProps.routes
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(LectureActions, DashboardActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
