import React, { Component } from 'react';
import CustomerApi from '../helpers/CustomerApi';
import { Link } from "react-router-dom";
import ShowError from "./shared/ShowError";

class ProviderSelector extends Component {
  constructor(props){
    super(props);
    this.state = { providers:[], isLoaded: false };
  }

  componentDidMount(){
    const apiUrl = "configuration";
    CustomerApi.get(apiUrl)
      .then((result) => {
        console.log("loaded", result);
        this.setState({
          providers: result,
          isLoaded: true
        });
      },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({ error, isLoaded:true });
          console.log(error);
        });
  }

  render() {
    return this.state.isLoaded ? (
      <div className="providerSelector">
      Choose provider: 
      {this.state.providers && this.state.providers.length
          ? this.state.providers.map(x=><React.Fragment key={x}><Link to={`/new/${x}`}>{x}&nbsp;</Link> | </React.Fragment>)
          : <span>No providers found</span>}
      <ShowError error={this.state.error} />
      </div>
    ) : <div>Loading...</div>;
  }
}

export default ProviderSelector;
