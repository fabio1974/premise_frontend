import React from "react";
import {deleteMovie, getMovies} from "../../services/movieService";
import Pagination from "../common/pagination";
import {paginate} from "../../utils/paginate";
import ListGroup from "../common/listGroup";
import {getGenres} from "../../services/genreService";
import _ from 'lodash'
import MoviesTable from "./moviesTable";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";




class Movies extends React.Component {

    state = {
        allMovies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        selectedGenre: null,
        sortColumn: {path: 'title', order: 'asc'}
    }


    async componentDidMount() {
        const {data} = await getGenres()
        const genres = [{name:'All Genres', _id:''},...data]
        const {data:movies} = await getMovies()
        this.setState({allMovies: movies, genres})
    }


    handleGenreSelect = genre =>{
        this.setState({selectedGenre: genre,currentPage:1})
    };

    handleSort = sortColumn =>{
        this.setState({sortColumn})
    }

    handleDelete = async movie => {
        const originalMovies = this.state.movies;
        const movies = this.state.allMovies.filter(m => m._id !== movie._id);
        this.setState({allMovies:movies});
        try {
            await deleteMovie(movie._id);
        }catch (ex) {
            if(ex.response && ex.response.status === 404)
                toast.error('This movie has already deleted.')
            this.setState({movies:originalMovies})
        }
    }

    handlePageChange = page => {
        this.setState({currentPage: page})
    }

    render() {
        const {user} = this.props;
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
                    <Link to={`/movies/new`} className="btn btn-primary mb-4">New Movie</Link>
                    <p> Showing {filtered.length} movies in the database</p>
                    <MoviesTable movies={movies}
                                 user={user}
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
