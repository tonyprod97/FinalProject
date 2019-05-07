import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './NavBar.css';
import authService from '../../services/AuthService';


export class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state={
            redirectTo : null
        }
        this.authService = authService;
        this.logout = this.logout.bind(this);
    }

    logout() {
        authService.logout();
        this.setState({redirectTo: '/login'});
    }
    render() {
        const path = window.location.pathname;
        if(path === '/login' || path === '/register') authService.logout();
        
        if(this.state.redirectTo == window.location.pathname) this.setState({ redirectTo: null });

        if(this.state.redirectTo) return <Redirect to={this.state.redirectTo} />;

        return (
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarToggler">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        { this.authService.isUserLoggedIn() && 
                            (<li className="nav-item active">
                            <Link className="nav-link" to="/home">Home <span className="sr-only">(current)</span></Link>
                        </li>)}
                        { this.authService.isUserLoggedIn() && 
                            (<li className="nav-item">
                            <Link className="nav-link" to="/table">Table <span className="sr-only">(current)</span></Link>
                        </li>)}
                        { this.authService.isUserLoggedIn() && 
                            (<li className="nav-item">
                            <Link className="nav-link" to="/chart">Chart <span className="sr-only">(current)</span></Link>
                        </li>)}
                    </ul>
                    <ul className="navbar-nav ">
                        { !this.authService.isUserLoggedIn() && 
                            (<li className="nav-item">
                            <Link className="nav-link" to="/login">Login <span className="sr-only">(current)</span></Link>
                            </li>)
                        }
                        { !this.authService.isUserLoggedIn() &&
                            (<li className="nav-item">
                                <Link className="nav-link" to="/register">Register <span className="sr-only">(current)</span></Link>
                            </li>)
                        }
                        { this.authService.isUserLoggedIn() &&
                            (<li className="nav-item">
                            <div onClick={this.logout.bind(this)} className="nav-link hover-pointer">Logout <span className="sr-only">(current)</span></div>
                            </li>)
                        }
                    </ul>
                </div>
            </nav>

        )
    }
}

