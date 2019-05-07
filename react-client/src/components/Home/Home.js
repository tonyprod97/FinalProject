import React, { Component } from 'react';
import Record from '../Record/Record';
import Statistic from '../Statistic/Statistic';
import './Home.css';

export class Home extends Component {
    constructor(props){
        super(props);
        this.statisticChild = React.createRef();
    }

    statisticChanged() {
        this.statisticChild.current.refreshStatistics();
    }
    render() {
        return (
            <div className="center-items">
                <div className="row">
                    <Record refreshStatistics={this.statisticChanged.bind(this)}/>
                </div>
                <div className="row">
                    <Statistic ref={this.statisticChild}/>
                </div>
            </div>
        )
    }
}