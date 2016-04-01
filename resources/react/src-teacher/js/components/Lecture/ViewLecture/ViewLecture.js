import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
// Utils
import { format, validatTypeName, validatTypeEn, validatTypeDesc } from '../../../utils/ValidationUtils';
//Actions
import * as LectureActions from '../../../actions/lecture';
import { routeActions } from 'react-router-redux';
// Material-UiI-components
import { Paper, Card, CardHeader, CardText, CardActions, FlatButton, TextField } from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import FontIcon from 'material-ui/lib/font-icon';
var LineChart = require("react-chartjs").Line;
var PieChart = require("react-chartjs").Pie;

class ViewLecture extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      id: {value: 0}
    };
    props.actions.fetchLecture(1);
  }

  render() {
    const { lecture } = this.props;
    const { id, name, en, description } = this.state;

    const beChanged = key => {
      const target = types.find(type => type.id === id.value);
      return target[key] !== this.state[key].value;
    };

var chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};

var pieData = [
    {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
    },
    {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },
    {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
    }
]
    return (
      <div>
        <div className="row content-wrap-white">
          {lecture.lecture !== 'undefind' && !lecture.isFetching &&
          <div>
            <div className="col-md-12">
              <h4 className="">
                <span>{`${lecture.lecture.department.name}・${lecture.lecture.department.faculty.name}`}</span>
                <span>{`授業コード：${lecture.lecture.code}`}</span>
              </h4>
            </div>
            <div className="col-md-6">
              <div className="space-top-2 row-space-2 clearfix">
                <div className="row">
                  <div className="col-md-4">
                    <label className="label-large" htmlFor="input-name">授業名</label>
                  </div>
                  <div className="col-md-8">
                    <div className="row-space-top-1 label-large text-right">
                      <div>残り<span>11</span>文字</div>
                    </div>
                  </div>
                </div>
                <input className="overview-title input-large" type="text" name="name" id="input-name"
                  defaultValue={lecture.lecture.title}
                  placeholder=""
                  maxLength={15}
                />
              </div>

              <div className="space-top-2 row-space-2 clearfix">
                <div className="raw">
                  <div className="col-md-4" style={{paddingLeft: 0, paddingRight: 10}}>
                    <label className="label-large" htmlFor="select-property_type_id">授業の時期</label>
                    <div className="row-space-1">
                      <div className="select select-block">
                        <select name="property_type_id" id="select-property_type_id">
                          <option selected value={1}>2016年度 前期</option>
                          <option value={2}>2016年度 前期</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4" style={{paddingLeft: 5, paddingRight: 5}}>
                    <label className="label-large" htmlFor="select-property_type_id">曜日</label>
                    <div className="row-space-1">
                      <div className="select select-block">
                        <select name="property_type_id" id="select-property_type_id">
                          <option selected value={1}>月曜日</option>
                          <option value={2}>火曜日</option>
                          <option value={3}>水曜日</option>
                          <option value={4}>木曜日</option>
                          <option value={5}>金曜日</option>
                          <option value={6}>土曜日</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4" style={{paddingLeft: 10, paddingRight: 0}}>
                    <label className="label-large" htmlFor="select-property_type_id">限</label>
                    <div className="row-space-1">
                      <div className="select select-block">
                        <select name="property_type_id" id="select-property_type_id">
                          <option selected value={1}>１限</option>
                          <option value={2}>２限</option>
                          <option value={3}>３限</option>
                          <option value={4}>４限</option>
                          <option value={5}>５限</option>
                        </select>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div className="space-top-2 row-space-2 clearfix">
                <div className="row">
                  <div className="col-md-4">
                    <label className="label-large" htmlFor="input-name">授業の場所</label>
                  </div>
                  <div className="col-md-8">
                    <div className="row-space-top-1 label-large text-right">
                      <div>残り<span>11</span>文字</div>
                    </div>
                  </div>
                </div>
                <input className="overview-title input-large" type="text" name="name" id="input-name"
                  defaultValue={lecture.lecture.place}
                  placeholder=""
                  maxLength={15}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="space-top-2 row-space-2 clearfix">
                <div className="raw">
                  <div className="col-md-6" style={{paddingLeft: 5, paddingRight: 5}}>
                    <label className="label-large" htmlFor="select-property_type_id">対象学年</label>
                    <div className="row-space-1">
                      <div className="select select-block">
                        <select name="property_type_id" id="select-property_type_id">
                          <option selected value={1}>月曜日</option>
                          <option value={2}>火曜日</option>
                          <option value={3}>水曜日</option>
                          <option value={4}>木曜日</option>
                          <option value={5}>金曜日</option>
                          <option value={6}>土曜日</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6" style={{paddingLeft: 10, paddingRight: 0}}>
                    <label className="label-large" htmlFor="select-property_type_id">授業時間</label>
                    <div className="row-space-1">
                      <div className="select select-block">
                        <select name="property_type_id" id="select-property_type_id">
                          <option selected value={1}>１限</option>
                          <option value={2}>２限</option>
                          <option value={3}>３限</option>
                          <option value={4}>４限</option>
                          <option value={5}>５限</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-top-2 row-space-2 clearfix">
                <div className="row">
                  <div className="col-md-4">
                    <label className="label-large" htmlFor="textarea-summary">授業の説明</label>
                  </div>
                  <div className="col-md-8">
                    <div className="row-space-top-1 label-large text-right">
                      <div>残り<span>161</span>文字</div>
                    </div>
                  </div>
                </div>
                <textarea className="overview-summary" rows={6} name="summary"
                  placeholder=""
                  maxLength={250}
                  data-ignore-handle-blur="true"
                  id="textarea-summary"
                  defaultValue={lecture.lecture.description}
                />
              </div>
            </div>
          </div>
          }
        </div>

        <div className="row content-wrap-white content-top-space">
          <div className="col-md-12">
            <h4 className="space-top-2">過去の授業一覧</h4>
          </div>
          {lecture.lecture !== 'undefind' && !lecture.isFetching &&
          <div className="space-top-2">
            <div className="col-md-5">
              <div className="list-group">
                {lecture.lecture.rooms.map(r =>
                  <a className="list-group-item"><span className="badge">14 人</span>{r.createdAt}</a>
                )}
              </div>
            </div>

            <div className="col-md-7">
              <div className="right-panel">
                {/*<p className="select">編集するタイプを選択してください</p>*/}
                <LineChart data={chartData} width="600" height="250"/>
                <PieChart data={pieData} width="600" height="250"/>
              </div>
            </div>
          </div>
          }
        </div>

      </div>
    );
  }
}

ViewLecture.propTypes = {
  routes: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    lecture: state.disposable.lecture,
    routes: ownProps.routes,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(LectureActions, routeActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewLecture);
