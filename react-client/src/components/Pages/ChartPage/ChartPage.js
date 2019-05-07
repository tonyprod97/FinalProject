import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './ChartPage.css';
import PeriodPicker from '../../PeriodPicker/PeriodPicker';
import Chart from '../../Chart/Chart';
import logService from '../../../services/LogService';
import periodPickerService from '../../../services/PeriodPickerService';

class ChartPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      chartData: []
    }
    this.mapChartData = this.mapChartData.bind(this);
  }

  componentDidMount(){
    logService.getAllLogs().then(res => this.mapChartData(res.data,'Since started logging'))
                              .catch(err => this.props.history.push('error'));
  }

  mapChartData(dataToMap, title) {
    let dataPoints = [];
      dataToMap.forEach( log => {
        dataPoints.push({
          x: new Date(log.date),
          y: log.value
        });
      });
      this.setState({chartData: dataPoints, chartTitle: title});
  }
  chartDataPeriod(data, from, to) {
    from = (new Date(from)).toLocaleDateString();
    to = (new Date(to)).toLocaleDateString();
    this.mapChartData(data,`From ${from} to ${to}`);
  }
  render(){
    return (
      <div className="ChartPage">
        <PeriodPicker submitFun={this.chartDataPeriod.bind(this)}
                      startingDate={periodPickerService.getMonthAgo()}
                      finalDate={periodPickerService.getToday()}/>
        <Chart title={this.state.chartTitle} dataPoints={this.state.chartData}/>
      </div>
    )
  }
}
ChartPage.propTypes = {
}

export default ChartPage;