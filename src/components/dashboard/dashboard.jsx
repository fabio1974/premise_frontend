import React, {Component, Fragment} from 'react';
import {Button} from "@material-ui/core";
import {getGenres, getGenresFromWebservices} from "../../services/genreService";
import {getMovies, getMoviesFromExternalWebserviceByGenre} from "../../services/movieService";
import config from './../../config.json'
import './dashboard.css'
import {AddFavorites} from "./addFavorites";
import Autocomplete from "../common/autoComplete";
import NavBar from "../navbar";
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
