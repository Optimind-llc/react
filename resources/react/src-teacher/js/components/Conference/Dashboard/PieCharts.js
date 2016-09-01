import React, { PropTypes, Component } from 'react';
var DoughnutChart = require("react-chartjs").Doughnut;

class PieChart extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      lineWidth: 300
    };
  }

  render() {
    const { pie } = this.props;
    const colors = {
      understood: '57,73,171',
      notUnderstand: '229,57,53',
    }

    const understood = [
        {
            value: pie.understood,
            color: `rgba(${colors.understood},1)`,
            highlight: `rgba(${colors.understood},0.8)`,
            label: "Understood"
        },
        {
            value: pie.attendance === 0 ? 1 : pie.attendance - pie.understood,
            color: "rgba(255,255,255,1)",
        }
    ];

    const notUnderstand = [
        {
            value: pie.notUnderstand,
            color: `rgba(${colors.notUnderstand},1)`,
            highlight: `rgba(${colors.notUnderstand},0.8)`,
            label: "Not Understand"
        },
        {
            value: pie.attendance === 0 ? 1 : pie.attendance - pie.notUnderstand,
            color: "rgba(255,255,255,1)",
        }
    ];

    const chartOptions = {
      segmentShowStroke : false,
      animation : false,
      scaleShowLabels : false,
    };

    return (
      <div className="row space-top-4" id="pie-wrap">
        <div className="col-md-6">
          <p className="h4 text-center space-top-0">Understood</p>
          <div className="pie-chart">
            <DoughnutChart
              data={understood}
              options={chartOptions}
              width="200"
              height="200"
            />
          <div>
          <div className="chart-center">
            <p>
              <span style={{color: `rgba(${colors.understood},1)`}}>{pie.understood}</span>
              <span>/</span>
              <span>{pie.attendance}</span>
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <p className="h4 text-center space-top-0">Not Understand</p>
          <div className="pie-chart">
            <DoughnutChart
              data={notUnderstand}
              options={chartOptions}
              width="200"
              height="200"
            />
          </div>
          <div className="chart-center">
            <p>
              <span style={{color: `rgba(${colors.notUnderstand},1)`}}>{pie.notUnderstand}</span>
              <span>/</span>
              <span>{pie.attendance}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

PieChart.propTypes = {
  pie: PropTypes.object.isRequired,
};

export default PieChart;
