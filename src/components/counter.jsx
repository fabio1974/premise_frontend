import React from "react";


class Counter extends React.Component {
    state={
        value:this.props.value,
    }

    render() {



        return (
            <div>
                {this.props.children}
                <span className="badge badge-primary m-3">{this.formatCount()}</span>
                <button onClick={this.handleIncrement} className="btn btn-primary btn-sm">Increment</button>
            </div>
        );
    }

    formatCount(){
        const {value} = this.state;
        return value === 0?'Zero': value;
    }

    handleIncrement=()=> {
        this.setState({count:this.state.value+1})
    }
}



export default Counter;
