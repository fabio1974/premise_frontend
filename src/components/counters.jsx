import React from "react";
import Counter from "./counter";


class Counters extends React.Component {

    state = {
        counters: [
            {id:1,value:6},
            {id:2,value:5},
            {id:3,value:7},
            {id:4,value:8}
        ]
    }

    render() {



        return (
            <div>
                {this.state.counters.map(counter=> (
                    <Counter key={counter.id} value={counter.value} selected >
                        <h4>Counter #{counter.id}</h4>
                    </Counter>
                ))}
            </div>
        );
    }
}


export default Counters;
