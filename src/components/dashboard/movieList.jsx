// @flow
import * as React from 'react';
import {Component, Fragment} from "react";
import config from "../../config.json";
import {AddFavorites} from "./addFavorites";
import {getGenresFromWebservices} from "../../services/genreService";
import {getMoviesFromExternalWebserviceByGenre} from "../../services/movieService";




class MovieList extends Component {

    state = {
        movies: [],
        ready:false
    }

    async componentDidMount() {
        const {data:result} = await getMoviesFromExternalWebserviceByGenre(this.props.genre.id)
        this.setState({movies:result.results, ready:true})
    }

    render() {
        return (
            <Fragment>
                <div className="row">
                    <div className="col-12 mt-3 font-weight-bold">
                        {this.props.genre.name}
                    </div>
                </div>
                <div className="row">
                    {
                        this.state.movies.map(movie=> {
                            const posterUrl = `${config.moviePosterUrl}/${movie.poster_path}`
                            console.log("posterUrl",posterUrl)
                            return (<div key={movie.id} className="image-container d-flex justify-content-start m-3 mb-0">
                                <img src={posterUrl} width="200" alt="movie"/>
                                <div className="overlay d-flex align-items-center justify-content-center">
                                    <AddFavorites/>
                                </div>
                            </div>)
                        })
                    }
                </div>
            </Fragment>
        );
    }
}

export default MovieList;
