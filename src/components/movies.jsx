import React from "react";
import {getMovies} from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import {paginate} from "../utils/paginate";
import ListGroup from "./common/listGroup";
import {getGenres} from "../services/fakeGenreService";
import _ from 'lodash'
import MoviesTable from "./moviesTable";

class Movies extends React.Component {

    state = {
        allMovies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        selectedGenre: null,
        sortColumn: {path: 'title', order: 'asc'}

    }


    componentDidMount() {
        const genres = [{name:'All Genres', _id:''},...getGenres()]
        this.setState({allMovies: getMovies(), genres})
    }

    handleGenreSelect = genre =>{
        this.setState({selectedGenre: genre,currentPage:1})
    };

    handleSort = sortColumn =>{
        this.setState({sortColumn})
    }

    handleDelete = movie => {
        const movies = this.state.allMovies.filter(m => m._id !== movie._id);
        this.setState({allMovies:movies});
    }

    handlePageChange = page => {
        this.setState({currentPage: page})
    }

    render() {
        const {length: count} = this.state.allMovies
        const {pageSize, currentPage, allMovies, genres, selectedGenre, sortColumn} = this.state;
        if (count === 0)
            return <p>There are no movies in the database</p>

        const filtered = selectedGenre && selectedGenre._id? allMovies.filter(m => m.genre._id === selectedGenre._id): allMovies;

        const sorted =  _.orderBy(filtered,[sortColumn.path], [sortColumn.order])
        const movies = paginate(sorted, currentPage, pageSize)

        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup
                        items={genres}
                        onItemSelect={this.handleGenreSelect}
                        selectedItem={this.state.selectedGenre}
                    />
                </div>
                <div className="col">
                    <p> Showing {filtered.length} movies in the database</p>
                    <MoviesTable movies={movies}
                                 onDelete={this.handleDelete}
                                 sortColumn={sortColumn}
                                 onSort={this.handleSort} />
                    <Pagination itemsCount={filtered.length}
                                currentPage={currentPage}
                                pageSize={pageSize}
                                onPageChange={this.handlePageChange}/>
                </div>
            </div>
        );
    }
}

export default Movies;
