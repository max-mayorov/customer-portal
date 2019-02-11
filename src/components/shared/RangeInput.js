import React, { Component } from 'react';

class RangeInput extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            from: this.props.range && this.props.range.from, 
            to: this.props.range && this.props.range.to
        };
        this.onFromChanged = this.onFromChanged.bind(this);
        this.onToChanged = this.onToChanged.bind(this);
    }

    onFromChanged(e) {
        const val = parseInt(e.target.value,10);
        if(isNaN(val)) return;
        this.setState(
            (prevState) => { return { from: val, to: prevState.to }; },
            () => {
                this.handleOnChange();
            });
    }

    onToChanged(e) {
        const val =  parseInt(e.target.value,10);
        if(isNaN(val)) return;
        this.setState(
            (prevState) => { return { from: prevState.from, to: val }; },
            () => {
                this.handleOnChange();
            });

    }

    handleOnChange() {
        return this.props.onChange && this.props.onChange(this.state);
    }

    render() {
        return <React.Fragment>
            <div><label>From: </label><input type="text" onChange={this.onFromChanged} value={this.props.range && this.props.range.from} /></div>
            <div><label>To: </label><input type="text" onChange={this.onToChanged} value={this.props.range && this.props.range.to} /></div>
        </React.Fragment>
    }
}

export default RangeInput;
