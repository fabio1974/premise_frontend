import React from 'react';
import * as Joi from "joi-browser";
import Form from "../common/form";
import {getGenres} from "../../services/genreService";
import {createMovie, getMovie, updateMovie} from "../../services/movieService";
import {toast} from "react-toastify";

class MovieForm extends Form {

    state = {
        data: {title:'',genreId:'', popularity:'', voteAverage:'', posterPath: ''},
        errors:{},
        genres: [],
    };

    async componentDidMount() {
        await this.setGenrerToState()
        const id = this.props.match.params.id;
        if(id!=='new')
            await this.setMovieToState(id);
    }

    async setGenrerToState(){
        const {data:genres} = await getGenres();
        this.setState({genres});
    }

    async setMovieToState(id){
        try{
            const {data:movie} = await getMovie(id)
            delete movie['_id']
            delete movie['__v']
            this.setState({data:{...movie}})
        }catch (ex) {
            if(ex.response && ex.response.status===404)
                return this.props.history.replace("/not-found");
        }
    }

    schema = {
        title: Joi.string().required().min(2).max(255).label("Title"),
        genreId: Joi.string().required().label("Genre"),
        popularity: Joi.number().min(0).required().label("Popularity"),
        voteAverage: Joi.number().min(0).required().label("Vote Average"),
        posterPath: Joi.string().min(5)
    }

    doSubmit = async () =>{
        const id = this.props.match.params.id
        try {
            (id==='new')?await createMovie(this.state.data):await updateMovie(this.state.data,id)
            return this.props.history.replace("/movies");
        } catch (e) {
            if (this.isClientError(e)) {
                if(id==='new') {
                    const errors = {...this.state.errors};
                    errors.title = e.response.data
                    this.setState({errors})
                }else
                    toast.error(e.response.data)
            }
        }
    }



    render() {
        console.log("validade vector ====> ",this.validate())
        const {history} = this.props
        const options = [{_id:'',name:''},...this.state.genres]
        return (
            <div className="row mt-4">
                <div className="col">
                    <h1 className="mb-4">{(this.id==='new')?'New':''} Movie Form</h1>
                        <form onSubmit={this.handleSubmit} action="">
                            {this.renderInput("title","Title")}
                            {this.renderInput("genreId","Genre","select",options)}
                            {this.renderInput("popularity","Popularity", 'number')}
                            {this.renderInput("voteAverage","Vote Average","number")}
                            {this.renderInput("posterPath","Poster")}
                            {this.renderBackButton('Back',history)}
                            {this.renderButton('Save')}
                        </form>
                </div>
            </div>
        );
    }




}

export default MovieForm;
