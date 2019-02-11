import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CustomerApi from '../helpers/CustomerApi';
import ShowError from "./shared/ShowError";
import IdPicker from "./shared/IdPicker";
import RangeInput from "./shared/RangeInput";
import queryString from 'query-string';

class RangeSelector extends Component {
  constructor(props) {
    super(props);
    const {from, to} = queryString.parse(window.location.search);
    this.state = { report: null, isLoaded: false, range: {from, to}, rangeLocked: from || to, redirect: false };
    this.hangleRangeSelected = this.hangleRangeSelected.bind(this);
    this.handleSendReport = this.handleSendReport.bind(this);
  }

  componentDidMount() {
    const apiUrl = `configuration/${this.props.provider}/${this.props.report}`;
    console.log("this.props",this.props);
    CustomerApi.get(apiUrl)
      .then((result) => {
        console.log("loaded", result);
        this.setState(prevState => ({
          report: result,
          isLoaded: true,
          range: this.state.rangeLocked ? prevState.range : { from: result.LastProcessedSmsNo+1, to: result.LatestId}
        }));
      },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({ error, isLoaded: true });
          console.log("Error", error);
        });
  }

  hangleRangeSelected(range){
    this.setState({ range });
  }

  handleSendReport(){
    const apiUrl = `publish/${this.props.provider}/${this.props.report}?from=${this.state.range.from}&to=${this.state.range.to}`;
    CustomerApi.post(apiUrl)
    .then((result) => {
      console.log("loaded", result);
      this.setState({redirect: result.Success && !result.Error});
      if(result.Error)
        alert(result.Error);
    },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({ error });
        console.log("Error", error);
      });
  }

  render() {
    const { report } = this.state;
    const { provider } = this.props;
    const hasReport = this.state.isLoaded && this.state.report;
    const range = this.state.range;
    if(this.state.redirect) return <Redirect to={`/queue/${provider}/${this.props.report}`} />
    return (
      <div className="rangeSelector">
        <div>Report:</div>
        {hasReport ? (<React.Fragment>
          <table>
            <tbody>
            <tr><td>Type</td><td>{report.Type}</td></tr>
            <tr><td>Filename</td><td>{report.Filename}</td></tr>
            <tr><td>Destination</td><td><div dangerouslySetInnerHTML={{ __html: report.Destination }} /></td></tr>
            <tr><td>Last processed id</td><td><IdPicker valueId={report.LastProcessedSmsNo} provider={provider} type={report.ProviderType} /></td></tr>
            <tr>
              <td>Range (optional)</td>
              <td><RangeInput range={range} onChange={this.hangleRangeSelected} /></td>
            </tr>
            <tr><td colSpan="2">
              <button onClick={this.handleSendReport}>Send report</button>
            </td></tr>
            </tbody>
          </table>
        </React.Fragment>) : <div>Loading...</div>}
        <ShowError error={this.state.error} />
        
      </div>);
  }
}

export default RangeSelector;
