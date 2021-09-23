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
import {getCurrenUser} from "../../services/authService";



class Movies extends React.Component {

    state = {
        allMovies: [],
        genres: [],
        pageSize: 10,
        currentPage: 1,
        selectedGenre: null,
        sortColumn: {path: 'title', order: 'asc'}
    }


    async componentDidMount() {
        const {data} = await getGenres()
        const genres = [{name:'All Genres', _id:''},...data]
        const {data:movies} = await getMovies()
        movies.map(m=>{
            m['genre']=genres.find(it=>it._id===m['genreId'])
            delete m['genreId']
            return m
        })
        this.setState({allMovies: movies, genres})
    }


    handleGenreSelect = genre =>{
        this.setState({selectedGenre: genre,currentPage:1})
    };

    handleSort = sortColumn =>{
        this.setState({sortColumn})
    }

    handleDelete = async movie => {
        const originalMovies = this.state.allMovies;
        const movies = this.state.allMovies.filter(m => m._id !== movie._id);
        this.setState({allMovies:movies});
        try {
            await deleteMovie(movie._id);
        }catch (ex) {
            if(ex.response && ex.response.status === 404)
                toast.error('This movie has already deleted.')
            else if(ex.response && ex.response.status === 403){
                toast.error(ex.response.data)
            }
            this.setState({allMovies:originalMovies})
        }
    }

    handlePageChange = page => {
        this.setState({currentPage: page})
    }

    render() {
        const {user} = this.props;
        const {length: count} = this.state.allMovies
        const {pageSize, currentPage, allMovies, genres, selectedGenre, sortColumn} = this.state;

        if (count === 0) {
            return (
                <React.Fragment>
                    <p>There are no movies in the database</p>
                    {getCurrenUser().isAdmin && <Link to={`/movies/new`} className="btn btn-primary mb-4">New Movie</Link>}
                </React.Fragment>
            )
        }

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
                    {getCurrenUser().isAdmin && <Link to={`/movies/new`} className="btn btn-primary mb-4">New Movie</Link>}
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
