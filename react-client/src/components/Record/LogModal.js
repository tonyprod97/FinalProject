import React, { Component } from "react";
import PropTypes from 'prop-types';

export class LogModal extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }
  submit(e) {
    this.props.closeFunc(e);
  }
  close() {
    this.props.resetFunc();
  }
  render() {
    const buttonStyle ={
      margin: '0px 5px'
    }
    return (
      <div
        className="modal fade"
        id="logModal"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{this.props.message}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.close}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Do you want to replace old weight?
              <button
              style={buttonStyle}
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.close}
              >
                No
              </button>
              <button 
              style={buttonStyle}
              type="button" onClick={this.submit.bind(this)} className="btn btn-primary">
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

LogModal.propTypes = {
  updateFunc: PropTypes.func,
  resetFunc: PropTypes.func
}
