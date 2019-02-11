import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import QueueView from './QueueView';
import CustomerApi from '../helpers/CustomerApi';
import ShowError from "./shared/ShowError";

class Queue extends Component {
  constructor(props){
      super(props);
      this.state = { queue: null, isLoaded: false };
      this.handleCancel = this.handleCancel.bind(this);
      this.handleRun = this.handleRun.bind(this);
    }

  componentDidMount(){
    this.load();
  }

  load() {
    const { provider, report } = this.props.match.params;
    const apiUrl = "queue"
      + (provider ? "/" + provider : "")
      + (report ? "/" + report : "");
    CustomerApi.get(apiUrl)
      .then((result) => {
        console.log("loaded", result);
        this.setState({
          isLoaded: true,
          queue: [].concat(...result.map(x => x.Queue ? x.Queue : x))
        });
      },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: false,
            error
          });
          console.log(error);
        });
  }

  handleCancel(report){
    CustomerApi.delete(`queue/${report.Guid}`)
    .then((result) => {
      console.log("handleCancel", result);
      this.load();
    },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          isLoaded: false,
          error
        });
        console.log(error);
      });
  }

  handleRun(report){
    this.setState({redirectToReport:report});
  }


  render() {
    if(this.state.redirectToReport){
      const row = this.state.redirectToReport;
      return <Redirect to={`/new/${row.ProviderName}/${row.ReportName}?from=${row.StartId}&to=${row.EndId}`} />
    }
    return (
      <div className="queue">
        <ShowError error={this.state.error} />
        Queue<br/>
        <QueueView queue={this.state.queue} onCancel={this.handleCancel} onRun={this.handleRun}/>
      </div>
    );
  }
}

export default Queue;
