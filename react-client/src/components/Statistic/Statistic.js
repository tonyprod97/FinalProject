import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import logService from '../../services/LogService';
import userService from '../../services/UserService';
import PeriodPicker from '../PeriodPicker/PeriodPicker';
import periodPickerService from '../../services/PeriodPickerService';

class Statistic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: null,
      from: undefined,
      to: undefined
    };
    this.handleApiResponse = this.handleApiResponse.bind(this);
  }

  componentDidMount() {
    let postData = {
      userId: userService.getUserId(),
      from: this.state.from,
      to: this.state.to
    }
    this.handleApiResponse(logService.statistic(postData));
  }

  onRequest(from, to) {
    this.setState({
      from: from,
      to: to
    })
    let postData = {
      userId: userService.getUserId(),
      from,
      to
    }
    this.handleApiResponse(logService.statistic(postData));
  }

  refreshStatistics() {
    this.onRequest(this.state.from, this.state.to);
  }


  handleApiResponse(res) {
    res.then(res => {
      let newState = {
        totalLogs: res.data.totalLogs,
        max: res.data.max,
        min: res.data.min,
        average: res.data.average
      }
      if (!this.state.from) newState.from = res.data.from;
      if (!this.state.to) newState.to = res.data.to;
      this.setState(newState);
    })
      .catch(err => this.setState({ redirectTo: 'error' }))
  }

  render() {
    if (this.state.redirectTo == window.location.pathname) this.setState({ redirectTo: null });

    if (this.state.redirectTo) return <Redirect to={this.state.redirectTo} />;

    let from, to;
    if (this.state.from) {
      from = (new Date(this.state.from)).toLocaleDateString();
      to = (new Date(this.state.to)).toLocaleDateString();
    }

    let title = `Displaying statistic from: ${from} - to: ${to} `;
    let model = this.state;

    return (
      <div>
       
        <div className="row">
            <div className="Statistic">
              <div className="card">
                <div className="card-header">
                  {title}
                </div>
                {model.totalLogs &&
                (<div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Total logs: {model.totalLogs}</li>
                    <li className="list-group-item">Highest weight: {model.max.value}kg on {new Date(model.min.date).toLocaleDateString()}</li>
                    <li className="list-group-item">Lowest weight: {model.min.value}kg on {new Date(model.max.date).toLocaleDateString()}</li>
                    <li className="list-group-item">Average weight: {model.average}kg</li>
                  </ul>
                </div>) }
                <div className="card-footer">
                  < PeriodPicker periodSelected={this.onRequest.bind(this)}
                    startingDate={periodPickerService.getMonthAgo()}
                    finalDate={periodPickerService.getToday()}
                  />
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}
Statistic.propTypes = {
}

export default Statistic;