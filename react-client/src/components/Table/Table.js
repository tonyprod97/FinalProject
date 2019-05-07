import React, {Component} from 'react';
import './Table.css';
import PropTypes from 'prop-types';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

function formatFloat(cell, row) {
  return parseFloat(cell);
}

class Table extends Component {
  constructor(props){
    super(props);
    this.onRowSelected = this.onRowSelected.bind(this);
    this.selectRowProp = {
      mode: 'radio',
      hideSelectColumn: true,  
      clickToSelect: true,
      onSelect: this.onRowSelected
    };
  }

  onRowSelected(row, isSelected, e) {
    this.props.rowClicked(row);
  }

  sortDate(a, b, order) {
    if(order === 'asc') return (new Date(a.date)).getTime() - (new Date(b.date)).getTime();
    return (new Date(b.date)).getTime() - (new Date(a.date)).getTime();
  }

  render(){
    return (
        <div className="Table">
          <BootstrapTable data={this.props.data} selectRow={this.selectRowProp} striped pagination hover>
              <TableHeaderColumn dataField='id' hidden isKey></TableHeaderColumn>
              <TableHeaderColumn dataSort={ true } dataField='value'
              filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<' ] } }
              dataFormat={ formatFloat }
              filterFormatted>Weight in kg</TableHeaderColumn>
              <TableHeaderColumn dataSort sortFunc={this.sortDate} dataField='date'>Date</TableHeaderColumn>
          </BootstrapTable>
        </div>
    )
  }
}

Table.propTypes = {
  rowClicked: PropTypes.func,
  data: PropTypes.array
}

export default Table;