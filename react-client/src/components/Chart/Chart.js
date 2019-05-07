import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CanvasJSReact from './canvasjs.react';

const CanvasJs = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Chart extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "dark2",
      zoomEnabled: true,
      title: {
        text: this.props.title
      },
      toolTip: {
        shared: true
      },
      axisX: {
        valueFormatString: "MMM YYYY",
        title: "Date",
        titleFontColor: '#51CDA0'
      },
      axisY: {
        title: "Weight",
        suffix: " kg",
        minimum: 0,
        titleFontColor: '#51CDA0'
      },
      data: [{
        type: "spline",
        lineColor: "#51CDA0",
        name: "kg",
        dataPoints: this.props.dataPoints
      }]
    }

		
   return (
      <div className="Chart">
        <CanvasJSChart options = {options}
        />
      </div>
    );
  }
}
Chart.propTypes = {
}

export default Chart;