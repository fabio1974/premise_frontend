import './App.css';

import React, {Component} from 'react';
import Navbar from "./components/navbar";
import Movies from "./components/movies";

class App extends Component {



    componentDidMount() {
        this.setState({})
    }

    render() {
        return (
            <React.Fragment>
                <Navbar totalCounters={5} />
                <main className="container">
                    <Movies/>
                </main>
            </React.Fragment>
        );
    }
}


export default App;
