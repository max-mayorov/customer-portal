import React, { Component } from 'react';
import CustomerApi from '../helpers/CustomerApi';
import { Link } from "react-router-dom";
import ShowError from "./shared/ShowError";

class ReportSelector extends Component {
  constructor(props){
    super(props);
    this.state = { reports:[], isLoaded: false };
  }

  componentDidMount(){
    const apiUrl = `configuration/${this.props.provider}`;
    CustomerApi.get(apiUrl)
      .then((result) => {
        console.log("loaded", result);
        this.setState({
          reports: result,
          isLoaded: true
        });
      },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({ error, isLoaded:true });
          console.log("Error", error);
        });
  }

  render() {
    return this.state.isLoaded ? (
      <div className="reportSelector">
      Choose report: 
      {this.state.reports && this.state.reports.length
          ? this.state.reports.map(x=><React.Fragment key={x.ReportName}><Link to={`/new/${this.props.provider}/${x.ReportName}`}>{x.ReportName}</Link> | </React.Fragment>)
          : <span>No reports found</span>}
      <ShowError error={this.state.error} />
      </div>
    ) : <div>Loading...</div>;
  }
}

export default ReportSelector;
