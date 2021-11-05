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
import Autocomplete from "../common/autoComplete";



class Movies extends React.Component {

    state = {
        allMovies: [],
        genres: [],
        pageSize: 10,
        currentPage: 1,
        selectedGenre: null,
        selectedTitle: null,
        sortColumn: {path: 'title', order: 'asc'},
        ready:false
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
        this.setState({allMovies: movies, genres, ready:true})
    }


    handleGenreSelect = genre =>{
        this.setState({selectedGenre: genre,currentPage:1})
    };

    handleFilterByTitle = title =>{
        this.setState({selectedTitle: title,currentPage:1})
    }

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

        if(!this.state.ready)
            return <div>loading...</div>

        const {user} = this.props;
        const {length: count} = this.state.allMovies
        const {pageSize, currentPage, allMovies, genres, selectedGenre, selectedTitle, sortColumn} = this.state;

        if (count === 0) {
            return (

                <React.Fragment>
                    <p>There are no movies in the database</p>
                    {getCurrenUser().isAdmin && <Link to={`/movies/new`} className="btn btn-primary mb-4">New Movie</Link>}
                </React.Fragment>
            )
        }

        const genreSelected = selectedGenre && selectedGenre._id? allMovies.filter(m => m.genre._id === selectedGenre._id): allMovies;
        const filtered = selectedTitle ?  genreSelected.filter(m => m.title === selectedTitle): genreSelected;
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

                        <Autocomplete
                            label="Search Movie by Title"
                            onSelectItem={this.handleFilterByTitle}
                            options={this.state.allMovies.map(it=>it.title)}
                        />


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
