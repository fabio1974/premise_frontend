import React, {Component} from 'react';
import TableHeader from "../common/tableHeader";
import TableBody from "../common/tableBody";
import {Link} from "react-router-dom";



class MoviesTable extends Component {


    columns = [
        {path:'title', label : 'Title', content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>},
        {path:'genre.name', label : 'Genre'},
        {path:'popularity', label : 'Popularity'},
        {path:'voteAverage', label : 'Vote Avg'},
        {
            content: movie => (
                <button disabled={!this.props.user || !this.props.user.isAdmin} onClick={() => this.props.onDelete(movie)}
                        className="btn btn-danger btn-sm">Delete
                </button>
            )
        }

    ]

    render() {
        const {movies, sortColumn, onSort} = this.props
        return (
            <table className="table">
                <TableHeader columns={this.columns} sortColumn={sortColumn} onSort={onSort} />
                <TableBody columns={this.columns} data={movies} />
            </table>
        );
    }
}

export default MoviesTable;
