import React, { Component } from "react";
import "./SignForm.css";
import { ErrorMessage } from "./ErrorMessage";
import {
  Redirect, Link
} from 'react-router-dom';
import userService from "../../services/UserService";
import "popper.js";
import $ from "jquery";
import "bootstrap/js/dist/util";
import authService from "../../services/AuthService";

class SignForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: this.props.data.action,
      formControls: this.props.data.formControls,
      redirectTo: null,
      error: {
        message: null
      }
    };
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.submit();
  }

  static getDerivedStateFromProps(props, current_state) {
    if(props.data.action !== current_state.action) {
      return({
        action: props.data.action,
        formControls: props.data.formControls
      })
    }
    return null;
  }
  submit(event) {
    event.preventDefault();

    userService
      .submitForm(this.props.data.postUrl, this.prepareData())
      .then(res => {
        let href;
        let toastMessage;

        if (res.data.id) {
          localStorage.setItem("user", JSON.stringify(res.data));
          href = "/home";
          toastMessage = 'Login success';
        } else {
          href = "/login";
          toastMessage = 'Thank you for registration';
        }
        
        $(".toast").toast("show");
        $(".toast").on("hidden.bs.toast", function() {
        });
        this.setState({toastMessage: toastMessage, redirectTo: href });
      })
      .catch(error => {
        if(error.response) {
        this.setState({
          error: {
            message: error.response.data.message
          }
        });
        } else {
          this.setState({ redirectTo: 'error' })
        }
      });
  }

  prepareData() {
    let postData = {
      UserName: this.state.formControls.username.value,
      Password: this.state.formControls.password.value
    };
    if (this.state.formControls.firstName)
      postData.FirsName = this.state.formControls.firstName.value;
    if (this.state.formControls.lastName)
      postData.LastName = this.state.formControls.lastName.value;

    return postData;
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    // gets all objects from formControls
    const updatedControls = {
      ...this.state.formControls
    };

    const updatedFormElement = {
      ...updatedControls[name]
    };

    updatedFormElement.value = value;
    updatedControls[name] = updatedFormElement;

    this.setState({
      formControls: updatedControls,
      error: {
        message: null
      }
    });
  }

  render() {
    if(this.state.redirectTo == window.location.pathname) this.setState({ redirectTo: null });
    
    if(this.state.redirectTo) return <Redirect to={this.state.redirectTo} />;

    const formStyle = {
      marginTop: "40px",
      textAlign: "center"
    };

    return (
      <div className="d-flex justify-content-center">
        <form style={formStyle} onSubmit={this.submit}>
          {Object.keys(this.state.formControls).map(key => (
            <div key={key} className="form-group">
              <label htmlFor={this.state.formControls[key].label}>
                {this.state.formControls[key].label}
              </label>
              <input
                className="form-control"
                name={key}
                type={this.state.formControls[key].type}
                aria-describedby={this.state.formControls[key].label}
                placeholder={"Enter " + this.state.formControls[key].label}
                value={this.state.formControls[key].value}
                onChange={this.handleChange}
                required={this.state.formControls[key].required}
              />
              <div className="invalid-feedback">
                Please choose a {this.state.formControls[key].label}
              </div>
            </div>
          ))}

          <ErrorMessage message={this.state.error.message} />
          <button type="submit" className="btn btn-primary">
            {this.props.data.action}
          </button>
          {!this.props.data.registerMode && (
            <div id="link-to">
              <label>Don't have account? </label>
              <Link className="nav-link" id="register-link" to="/register">Register</Link>
            </div>
          )}
        <div data-delay="1500" className="toast">
          <div className="toast-body">{this.state.toastMessage}</div>
        </div>
        </form>
      </div>
    );
  }
}

export default SignForm;
