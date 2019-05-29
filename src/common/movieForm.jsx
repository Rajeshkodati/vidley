import React from 'react';
import Joi from 'joi-browser';
import Form from './form';
import {getMovie, saveMovie } from '../services/fakeMovieService';
import { getGenres} from '../services/fakeGenreService'
// const MoviesForm = () => {
//     return(
//         <div>
//             <h1>MovieForm</h1>
            
//        </div>
//     )
// }
 
// export default MoviesForm;
class MoviesForm extends Form {
    state = { 
        data:{
            title:"",
            genreId:'',
            numberInStock:'',
            dailyRentalRate:''
        },
        genres:[],
        errors:{}
     }
     schema = {
        title: Joi.string().required().label("Title"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().required().min(0).max(100).label("Number In Stock"),
        dailyRentalRate: Joi.number().required().min(0).max(10).label("Daily Rental Rate"),
     }
     componentDidMount(){
         const genres = getGenres();
         this.setState({genres});

         const movieId = this.props.match.params.id;
         if(movieId === 'new') return;
         const movie = getMovie(movieId);
         if(!movie) return this.props.history.replace('/not-found');
         
         this.setState({data:this.mapToViewModel(movie)});
    }
    mapToViewModel(movie){
        return {
            _id:movie._id,
            title: movie._title,
            genreId: movie.genre._id,
            numberInStock:movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
    }

    doSubmit = () => {
        saveMovie(this.state.data);
        this.props.history.push('/movies')
    }
    render() { 
        return ( 
            <div>
                <h1>MovieForm </h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('title', "Title", "text")}
                    {this.renderSelect('genreId', "Genre", this.state.genres, "text")} 
                    {this.renderInput('numberInStock', "Number In Stock", 'number')} 
                    {this.renderInput('dailyRentalRate', "Daily Rental Rate", 'number')} 
                    {this.renderButton('Register')}
                </form>
            </div>
         );
    }
}
 
export default MoviesForm;