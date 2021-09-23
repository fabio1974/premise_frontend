import React from 'react';
import * as Joi from "joi-browser";
import Form from "../../common/form";
import {getGenres} from "../../../services/genreService";
import {getMovie} from "../../../services/movieService";
import http from "../../../services/httpService";
import config from '../../../config.json'

class MovieForm extends Form {

    state = {
        data: {title:'',genreId:'', numberInStock:'', dailyRentalRate:''},
        errors:{}
    };

    async componentDidMount() {
        await this.populateGenders();
        await this.populateMovies();
    }

    async populateGenders(){
        const {data:genres} = await getGenres();
        this.setState({genres});
    }

    async populateMovies(){
        try{
            const id = this.props.match.params.id
            if(id==='new') return;

            const {data:movie} = await getMovie(id)
            const {title,genre,numberInStock,dailyRentalRate} = movie
            this.setState({data:{title,genreId:genre['_id'],numberInStock,dailyRentalRate}})
        }catch (ex) {
            if(ex.response && ex.response.status===404)
                return this.props.history.replace("/not-found");
        }
    }



    schema = {
        title: Joi.string().required().min(8).label("Title"),
        genreId: Joi.required().label("Genre"),
        numberInStock: Joi.number().min(0).max(100).required().label("Number in Stock"),
        dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
    }

    doSubmit = async () =>{
        const obj = {title:'a', body: 'b'}
        await http.get("config.apiEndpoint");
        console.log("Submited")
    }

    handleAdd = async () =>{
        const obj = {title:'a', body: 'b'}
        const {data:post} = await http.post(config.apiEndpoint,obj);
        console.log("Added")
    }

    handleUpdate = async (data) =>{
        const originalData = this.state.data
        this.setState({data})
        try{
            await http.put(config.apiEndpoint+ "/" + data.id,data);
            //throw new Error('')
        }catch(ex){
            //expected response
            if(ex.response && ex.response.status === 404)
                alert('This data has been deleted')
            else { //unexpected response
                console.log('Generic unexpected error', ex)
                alert('Unexpected Error')
            }
            alert('Something failed while updateing')
            this.setState({data:originalData})
        }
    }



    handleDelete = async data => {
        const originalData = this.state.data
        this.setState({data})
        await http.delete(config.apiEndpoint+ "/" + data.id,data);
    }




    render() {
        const {match,history} = this.props


        return (
            <div className="row mt-4">
                <div className="col">
                    <h1 className="mb-4">{(this.id==='new')?'New':''} Movie Form</h1>
                        <form onSubmit={this.handleSubmit} action="">
                            {this.renderInput("title","Title")}
                           {/* {this.renderInput("genreId","Genre","select",genres)}*/}
                            {this.renderInput("numberInStock","Number in Stock", 'number')}
                            {this.renderInput("dailyRentalRate","Rate","number")}
                            {this.renderBackButton('Back',history)}
                            {this.renderButton('Save')}
                        </form>

                </div>
            </div>
        );
    }




}

export default MovieForm;
