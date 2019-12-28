import React from 'react';
import { Link } from 'react-router-dom'
import Like from '../common/like';
import Table from './table';

class MoviesTable  extends React.Component {
    columns = [
        {path:'title', label:"Title" , content: movie => <Link to={`movies/${movie._id}`}>{movie.title}</Link>
    },
        {path:'genre.name', label:"Genre"},
        {path:'numberInStock', label:"Stock"},
        {path:'dailyRentalRate', label:"Rate"},
        {key:'like',
         content: movie => (
         <Like liked={movie.liked} onClick={() => this.props.onLiked(movie)}/>
         )},
        {key: 'delete',
         content: movie => (
         <button className="btn btn-danger btn-sm"
         onClick={()=> this.props.onDelete(movie)}>Delete</button>)
        }
    ]
    render() { 
        const {movies,  onSort, sortColumn} = this.props

        return ( 
             <Table 
                columns={this.columns}
                data={movies}
                sortColumn={sortColumn} 
                onSort={onSort}/> 
        );
    }
}
 
export default MoviesTable;