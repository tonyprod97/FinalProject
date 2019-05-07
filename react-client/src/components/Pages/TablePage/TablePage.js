import React, {Component} from 'react';
import './TablePage.css';
import Table from '../../Table/Table';
import Record from '../../Record/Record';
import logService from '../../../services/LogService';
import Log from '../../../Models/Log';
import PeriodPicker from '../../PeriodPicker/PeriodPicker';
import periodPickerService from '../../../services/PeriodPickerService';

class TablePage extends Component {
  
  constructor(props){
    super(props);
    this.recordChild = React.createRef();

    this.state = {
      tableData: []
    }
  }

  componentDidMount() {
    logService.getAllLogs()
                  .then(res => {
                    let logs = [];
                    res.data.forEach(log => {
                      logs.push(new Log(log.id,log.value,(new Date(log.date).toLocaleDateString())));
                    });
                    this.setState({tableData: logs})
                  })
                  .catch(err => this.props.history.push('error'));
  }

  handleRefreshTableData(shouldDelete,log) {
    let newTableData;
    newTableData = this.state.tableData.filter(l => l.id != log.id);
    //update or create new log
    log.date = (new Date(log.date)).toLocaleDateString();
    if(!shouldDelete) newTableData.push(log);
    this.setState({tableData: newTableData});
  }

  tableRowClicked(row) {
    let tempDate = new Date(row.date);
    tempDate.setDate(tempDate.getDate()+1);
    this.recordChild.current.updateActiveLog(new Log(row.id, row.value, tempDate));
  }

  tableDataPeriod(data) {
    let newTableData = data.map(log => {
      log.date = (new Date(log.date)).toLocaleDateString();
      return log;
    });
    this.setState({tableData: newTableData});
  }
  
  render(){
    return (
      <div className="TablePage">
        <div className="row">
        <div className="card" id="table-page-picker">
            <PeriodPicker submitFun={this.tableDataPeriod.bind(this)}
              startingDate={periodPickerService.getMonthAgo()}
              finalDate={periodPickerService.getToday()}
            />
            </div>
        </div>
        <div className="row margin-top">
          <div id="table" className="col-sm-8"><Table rowClicked={this.tableRowClicked.bind(this)} data={this.state.tableData}/></div>
          <div id="record" className="col-sm-4">
            <Record ref={this.recordChild} refreshTableData={this.handleRefreshTableData.bind(this)}/>
          </div>
        </div>
      </div>
    )
  }
}

export default TablePage;