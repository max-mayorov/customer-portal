import React, {Component} from "react";
import CustomerApi from "../../helpers/CustomerApi";


class IdPicker extends Component{

    constructor(props){
        super(props);
        this.state = { valueId: props.valueId, valueDate: props.valueDate };
    }

    componentDidMount() { 
        this.trySetValueId();
        this.trySetValueDate();
    }

    trySetValueId() {
        const {provider, type} = this.props;
        if (!this.state.valueId) {
            CustomerApi 
                .get(`${type}/${provider}?start=${this.state.valueDate}&end=${this.state.valueDate}`)
                .then((result) => {
                    if(result){
                        this.setState({ valueId: result.StartId });
                    }
                },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        console.log(error);
                    });
        }
    }

    trySetValueDate() {
        const {provider, type} = this.props;
        if (!this.state.valueDate) {
            CustomerApi
                .get(`${type}/${provider}?id=${this.state.valueId}`)
                .then((result) => {
                    if(result){
                        this.setState({ valueDate: result.SentAt ? result.SentAt : result.StartTime });
                    }
                },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        console.log(error);
                    });
        }
    }

    render(){
        return <div>
            <div>{this.state.valueId}</div>
            <div>{this.state.valueDate}</div>
        </div>
    }

}

export default IdPicker;