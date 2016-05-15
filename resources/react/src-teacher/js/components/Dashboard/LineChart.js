import React, { PropTypes, Component } from 'react';
import { Line } from 'react-chartjs';

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
    const { line } = this.props;

    const lineRange = 30;

    let labels = [];
    let confusedData =[];
    let boringData =[];
    let n = 0;
    for (let i = line.boring.length - 1; i >= 0; i--) {
      n++;
      if (n < lineRange) {
        labels.unshift(i * 2);
        confusedData.unshift(
          Math.round(line.confused[i]/line.attendance[i]*100)
        );
        boringData.unshift(
          Math.round(line.boring[i]/line.attendance[i]*100)
        );
      }
    }

    const colors = {
      confused: '57,73,171',
      interesting: '67,160,71',
      boring: '229,57,53',
    }



    const lineData = {
      labels: labels,
      datasets: [
        {
          label: "confused",
          fillColor: `rgba(${colors.confused},0)`,
          strokeColor: `rgba(${colors.confused},1)`,
          pointColor: `rgba(${colors.confused},1)`,
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: confusedData
        },{
          label: "boring",
          fillColor: `rgba(${colors.boring},0)`,
          strokeColor: `rgba(${colors.boring},1)`,
          pointColor: `rgba(${colors.boring},1)`,
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: boringData
        }
      ]
    };

    const chartOptions = {
      scaleShowGridLines : true,
      // bezierCurve : false,
      bezierCurveTension : 0.5,
      animation : false,
      // scaleShowHorizontalLines: true, //水平メモリ
      // scaleShowVerticalLines: true, //垂直メモリ
      scaleOverride : true,
      // Y軸に表示する目盛数
      scaleLabel: "<%=value%> %",
      scaleSteps : 5,
      // Y軸目盛の幅
      scaleStepWidth : 20,
      // Y軸の開始数値
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
              style={{width: this.state.lineWidth}}
            />
          }
        </div>
      </div>
    );
  }
}

LineChart.propTypes = {
  line: PropTypes.object.isRequired,
};

export default LineChart;
