import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import './Record.css';
import PropTypes from 'prop-types';
import userService from '../../services/UserService';
import logService from '../../services/LogService';
import Log from '../../Models/Log';
import { LogModal } from './LogModal';
import "popper.js";
import $ from "jquery";
import "bootstrap/js/dist/util";

class Record extends Component {
  constructor(props){
    super(props);
   
    this.state = ({
      id: null,
      date: new Date(),
      weight: '',
      errorMessage: '',
      showAlert: false,
      alertMessage: ''
    });
    this.handleChange = this.handleChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.displayAlert = this.displayAlert.bind(this);
  }

  updateActiveLog(log) {
    this.setState({
      id: log.id,
      weight: log.value,
      date: new Date(log.date)
    })
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    
    this.setState(state => {
      state[name] = value;
      return state;
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const postData = {
      userId: userService.getUserId(),
      value: this.state.weight,
      date: this.state.date,
      id: this.state.id,
      redirectTo: null
    };

    logService.submit(postData)
                .then(
                  (res) => {
                    const log = new Log(res.data.id, res.data.value, res.data.date);
                    this.displayAlert('New Log succesfully saved!');
                    this.resetForm();
                    if(this.props.refreshTableData) this.props.refreshTableData(false, log);
                  })
                  .catch(error => {
                    if(error.response) {
                      this.setState({
                        errorMessage: error.response.data.message,
                        id: error.response.data.logData.id,
                      })
                    } else {
                      this.setState({ redirectTo: 'error'});
                    }
                  });
  }

  resetForm() {
    this.setState({
      id: null,
      date: new Date(),
      weight: '',
      errorMessage: ''
    });
    $('#logModal').modal('hide');
    if(this.props.refreshStatistics) this.props.refreshStatistics();
  }

   displayAlert (message) {
        this.setState({showAlert:true, alertMessage: message});
        setTimeout(() => {
          this.setState({showAlert: false, alertMessage: ''})
        }, 1500);
      }
  
  onDelete() {
    const log = new Log(this.state.id, this.state.weight, this.state.date);
    logService.delete(this.state.id)
              .then(
                (res) => {
                  this.displayAlert('Log successfully deleted!')
                  this.resetForm();
                  this.props.refreshTableData(true, log);
                })
              .catch(error => this.setState({ redirectTo: 'error'}));
  }

  render(){
    if(this.state.redirectTo == window.location.pathname) this.setState({ redirectTo: null });

    if(this.state.redirectTo) return <Redirect to={this.state.redirectTo} />;

    if(this.state.errorMessage) {
      $('#logModal').modal('show');
    }
    const formatDate = date => {
      let tempDate;
      try {
        tempDate = new Date(date);
      return tempDate.toISOString().split('T')[0];
      } catch(invalidDate) {
        return date;
      }
    }

    const recordButtonText = this.state.id ? 'Update' : 'Save';
    const deleteButton = this.state.id ? 
          <button type="button" id="deleteButton" onClick={this.onDelete.bind(this)} className="btn btn-danger">Delete</button>
          : null;

    const clearButton = this.state.id ? 
          <button type="button" id="clearButton" onClick={this.resetForm} className="btn btn-sm btn-info">Clear</button>
          : null;

    return (
      <div className="Record">
        <div className="card text-center">
          <form className="needs-validation" onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input className="form-control" 
                      type="date"
                      value={formatDate(this.state.date)}
                      onChange={this.handleChange}
                      name="date"
                      required/>
            </div>

            <div className="form-group">
              <label htmlFor="weight">Weight</label>
              <input className="form-control" 
                      type="number"
                      step="0.01"
                      min="0.1"
                      value={this.state.weight}
                      onChange={this.handleChange}
                      name="weight"
                      required/>
            </div>
            <div className="button-container">
              {clearButton}
              {deleteButton}
              <button type="submit"  className="btn btn-primary"
              >{recordButtonText}</button>
            </div>
            {this.state.showAlert && 
              <div className="alert alert-success" role="alert">
                {this.state.alertMessage}
              </div>
            }
          </form>
        </div>
        <LogModal resetFunc={this.resetForm} closeFunc={this.onSubmit} message={this.state.errorMessage}/>
      </div>
    )
  }
}
Record.propTypes = {
  refreshTableData: PropTypes.func,
  refreshStatistics: PropTypes.func
}

export default Record;