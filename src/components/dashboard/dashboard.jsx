import React, {Component} from 'react';
import {getGenresFromWebservices} from "../../services/genreService";
import './dashboard.css'
import MovieList from "./movieList";


class Dashboard extends Component {

    state = {
        genres: [],
        ready:false
    }

    async componentDidMount() {
        const {data:genres} = await getGenresFromWebservices()
        this.setState({genres:genres.genres, ready:true})
    }

    render() {
        if(!this.state.ready)
            return <div>loading...</div>
        return (
            <main className="container">
            <div className="mydashboard container-fluid movie-app">
                {this.state.genres.map(genre =>
                    <MovieList genre={genre} />
                )}
            </div>
            </main>
        );
    }
}

export default Dashboard;
