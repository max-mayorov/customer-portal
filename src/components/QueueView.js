import React from 'react';
import ReactTable from "react-table";
import { NavLink } from 'react-router-dom'
import IdPicker from './shared/IdPicker';

const styleSuccess = (row) => {
  return {  backgroundColor: row.original.Success ? "#99ff99" : "#ff9999" };
}

const styleStatus = (row) => {
  const mapping = {
    Idle: "orange",
    Running: "yellow",
    Cancelled: "ltgray",
    Done: "green",
    Error: "red"
  }
  return {color: mapping[row.Status]};
}

const isCancellable = (row) => ({ Running: true, Idle: true }[row.Status]);

const isRunnable = (row) => ({ Done: true, Error: true }[row.Status]);

const columns = (props) => [{
  Header: "Provider Name",
  accessor: "ProviderName",
  Cell: row => <NavLink to={`/queue/${row.value}`}>{row.value}</NavLink>
},{
  Header: "Report Name",
  accessor: "ReportName",
  Cell: row => <React.Fragment>
                <NavLink to={`/queue/${row.original.ProviderName}/${row.value}`}>{row.value}</NavLink>
              </React.Fragment>
},{
  Header: "Guid",
  accessor: "Guid",
  Cell: row => <div style={styleSuccess(row)}>{row.value}</div>
},{
  Header: "Status",
  accessor: "Status",
  Cell: row => <React.Fragment>
                  <div>{row.value}</div>
                  <div>
                    {props.onCancel && isCancellable(row.original) && <button onClick={(e) => props.onCancel(row.original)}>Cancel</button>}
                    {props.onRun && isRunnable(row.original) && <button onClick={(e) => props.onRun(row.original)}>Rerun</button>}
                  </div>
                </React.Fragment>
},{
  Header: "StartId",
  accessor: "StartId",
  Cell: row => <IdPicker valueId={row.value} provider={row.original.ProviderName} type={row.original.ProviderType}/>
},{
  Header: "EndId",
  accessor: "EndId",
  Cell: row => <IdPicker valueId={row.value} provider={row.original.ProviderName} type={row.original.ProviderType}/>
},{
  Header: "Success",
  accessor: "Success",
},{
  Header: "Error",
  accessor: "Error",
},{
  Header: "HasUnresolved",
  accessor: "HasUnresolved",
},{
  Header: "Started",
  accessor: "Started",
},{
  Header: "Finished",
  accessor: "Finished",
}];

const getTrProps = (state, rowInfo, instance) => rowInfo   
    ? { style: styleStatus(rowInfo.row) }
    : { style: {color:"#666600"}};

const QueueView = (props) => 
    props.queue && 
    <ReactTable
        filterable={true}
        data={props.queue}
        columns={columns(props)} 
        getTrProps={getTrProps}
        getTrGroupProps={getTrProps}/>

export default QueueView;
