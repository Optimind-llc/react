import React, { PropTypes, Component } from 'react';
import { Line } from 'react-chartjs';
import moment from 'moment';

class LineChart extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      lineWidth: 0
    };
  }

  componentDidMount() {
    this.setState({
      lineWidth: document.getElementById('dashboard-line-wrap').clientWidth - 40
    });
  }

  render() {
    const { reactions, startAt } = this.props;

    //表示する時間はlineRange * interval
    const lineRange = 120;
    const interval = 10;
    const dtl = lineRange*interval; // display time length 表示する時間の長さ

    const effectiveTime = 180;

    let labels = [];
    let understoodDate =[];
    let notUnderstandData =[];

    let startTime = Math.round(moment(startAt, 'YYYY-MM-DD HH:mm:ss').unix() / 10)*10;
    let endTime = Math.round(moment().unix() / 10)*10;

    const fakeCosCoef = [];

    for (let i = effectiveTime/2; i >= 0; i=i-10) {
      fakeCosCoef[i] = 100*Math.cos(i*Math.PI/effectiveTime);
      // fakeCosCoef[i] = Math.round(100*(1 - (l*2/effectiveTime)))
    }

    //最小目盛りごとの値を計算する
    for (let i = 0; i <= lineRange - 1; i++) {
      let Ti = endTime - startTime > dtl ? (endTime - dtl + interval*i) : startTime + interval*i;

      labels[i] = Ti;

      let Ac = [];
      let Ai = [];

      for (var j = reactions.length - 1; j >= 0; j--) {
        let r = reactions[j];

        // if (r.type !== 0) {
          let l = Math.abs(Math.round(Number(r.createdAt)/10)*10 - Ti);
          let a = l >= effectiveTime/2 ? 0 : fakeCosCoef[l];

          let Ar;
          switch (r.type){
            case "1":
              Ar = Ac[Number(r.auditorId)];
              Ac[Number(r.auditorId)] = typeof Ar === 'undefined' ? a : Ar+a > 100 ? 100 : Ar+a;
              break;
            case "2":
              Ar = Ai[Number(r.auditorId)];
              Ai[Number(r.auditorId)] = typeof Ar === 'undefined' ? a : Ar+a > 100 ? 100 : Ar+a;
              break;
          }
        // }
      }

      let numberOfStudents = reactions
        .map(r => r.auditorId)
        .filter((r, i, self) => self.indexOf(r) === i)
        .length;

      switch (Ac.length){
        case 0:
          understoodDate[i] = 0;
          break;
        case 1:
          understoodDate[i] = Ac[i];
          break;
        default:
          understoodDate[i] = Math.round(Ac.reduce((a, b) => a + b)/numberOfStudents);
          break;
      }

      switch (Ai.length){
        case 0:
          notUnderstandData[i] = 0;
          break;
        case 1:
          notUnderstandData[i] = Ai[i];
          break;
        default:
          notUnderstandData[i] = Math.round(Ai.reduce((a, b) => a + b)/numberOfStudents);
          break;
      }
    }

    let nextLabel = labels.map((l, i, array) => {
      return Math.round(l/60) === Math.round(array[i-1]/60) ? '' : moment(l, 'X').format('HH:mm')
    });

    const colors = {
      understood: '57,73,171',
      notUnderstand: '229,57,53',
    }

    const lineData = {
      labels: nextLabel,
      datasets: [
        {
          label: "understood",
          fillColor: `rgba(${colors.understood},0)`,
          strokeColor: `rgba(${colors.understood},1)`,
          pointColor: `rgba(${colors.understood},1)`,
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: understoodDate
        },{
          label: "notUnderstand",
          fillColor: `rgba(${colors.notUnderstand},0)`,
          strokeColor: `rgba(${colors.notUnderstand},1)`,
          pointColor: `rgba(${colors.notUnderstand},1)`,
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: notUnderstandData
        }
      ]
    };

    const chartOptions = {
      scaleShowGridLines : true,
      bezierCurve : true,
      bezierCurveTension : 0.4,
      animation : true,
      // scaleShowHorizontalLines: true, //水平メモリ
      // scaleShowVerticalLines: true, //垂直メモリ
      scaleOverride : true,
      scaleLabel: "<%=value%> %",
      scaleSteps : 5,
      scaleStepWidth : 20,
      scaleStartValue : 0,
      pointDot : false,
    };

    return (
      <div className="space-top-3 space-bottom-3 has-border">
        <div id="dashboard-line-wrap" className="bg-white" style={{padding: '20px'}}>
          {this.state.lineWidth !== 0 &&
            <Line
              data={lineData}
              options={chartOptions}
              width={this.state.lineWidth}
              height="300"
              style={{ width: this.state.lineWidth }}
            />
          }
        </div>
      </div>
    );
  }
}

LineChart.propTypes = {
  reactions: PropTypes.array.isRequired
};

export default LineChart;
