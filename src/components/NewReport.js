import React, { Component } from 'react';
import CustomerApi from '../helpers/CustomerApi';
import ProviderSelector from "./ProviderSelector";
import ReportSelector from "./ReportSelector";
import RangeSelector from "./RangeSelector";
import { Link } from "react-router-dom";

class NewReport extends Component {
  constructor(props){
      super(props);
      this.state = { providers: null, reports: null };
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

  render() {
    const { provider, report } = this.props.match.params;
    return (
      <div className="new-report">
        {provider 
            ? <div>Provider: <strong>{provider}</strong> <Link to={`/new`}>x (remove)</Link></div>
            : <ProviderSelector />}
        {report
            ? <div>Report: <strong>{report}</strong> <Link to={`/new/${provider}`}>x (remove)</Link></div>
            : provider 
                ? <ReportSelector provider={provider} />
                : <div>Please select provider</div>}
        {provider && report
            ? <RangeSelector provider={provider} report={report} />
            : null}
      </div>
    );
  }
}

export default NewReport;
