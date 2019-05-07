import React, {Component} from 'react';
import './PeriodPicker.css';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import periodPickerService from '../../services/PeriodPickerService';

class PeriodPicker extends Component {
  constructor(props){
    super(props);
    this.state = {
      startingDate: this.props.startingDate,
      finalDate: this.props.finalDate,
      redirectTo: null
    }
    this.adjustFormat = this.adjustFormat.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(state => {
      state[name] = value;
      state.errorMessage = '';
      return state;
    });
  }

  adjustFormat(date) {
    let tempDate = new Date(date);
    tempDate = tempDate.toISOString().split('T')[0];
    return tempDate;
  }

  onSubmit(e) {
    e.preventDefault();
    if((new Date(this.state.finalDate)).getTime()<=((new Date(this.state.startingDate)).getTime())) {
      this.setState({errorMessage: 'Final date must be after starting date'});
      return;
    }
    if(this.props.periodSelected) this.props.periodSelected(this.state.startingDate, this.state.finalDate);

    if(this.props.submitFun)
                 periodPickerService.getLogsInPeriod(this.state.startingDate,this.state.finalDate)
                .then(res => this.props.submitFun(res.data,this.state.startingDate,this.state.finalDate))
                .catch(err => this.setState({ redirectTo: 'error'}));
  }

  render(){
    if(this.state.redirectTo) return <Redirect to={this.state.redirectTo} />;

    let startingDate = this.state.startingDate ? this.adjustFormat(this.state.startingDate) : undefined;
    let finalDate = this.state.finalDate ? this.adjustFormat(this.state.finalDate) : undefined;

    return (
      <div className="PeriodPicker">
        <form className="needs-validation form-inline justify-content-center" onSubmit={this.onSubmit.bind(this)}>
            <div className="form-group mb-2">
              <label htmlFor="startingDate">Starting date</label>
              <input type="date" className="form-control" name="startingDate" placeholder="Starting date" onChange={this.handleChange} value={startingDate} required/>
            </div>
            <div className="form-group mb-2 mx-sm-3">
              <label htmlFor="finalDate">Final date</label>
              <input type="date" className="form-control" name="finalDate" placeholder="Final date" onChange={this.handleChange} value={finalDate} required/>
            </div>
            <div className="form-group mb-1">
              <button className="btn btn-primary align-self-start" type="submit">Request</button>
            </div>
              <div className="error">
                {this.state.errorMessage}
              </div>
        </form>
      </div>
    )
  }
}

PeriodPicker.propTypes = {
  submitFun: PropTypes.func,
  periodSelected: PropTypes.func,
  startingDate: PropTypes.instanceOf(Date),
  finalDate: PropTypes.instanceOf(Date)
}

export default PeriodPicker;