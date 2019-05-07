import React, {Component} from 'react';

class ErrorPage extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    setTimeout(() => window.history.go(-1), 5000);
  }
  render(){
    return (
      <div className="ErrorPage">
        <h2>Error ocurred</h2>
      </div>
    )
  }
}

export default ErrorPage;