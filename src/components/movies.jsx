import React from 'react';
import {getMovies} from '../services/fakeMovieService';
import Pagination from '../common/pagination'
import {Paginate} from '../Utilis/paginate';
import ListGroup from '../common/listGroup';
import SearchBox from "../common/searchbox";
import {getGenres} from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import {Link} from 'react-router-dom';
import _ from 'lodash';

class Movies extends React.Component  {
    state = {
        movies:[],
        pageSize:4,
        currentPage:1,
        genres:[],
        searchQuery:"",
        selectedGenre:null,
        sortColumn: {path:'title', order:'asc'}
      }
    componentDidMount(){
        const genres = [{ _id:"", name: 'All Movies'}, ...getGenres()]
        this.setState({movies:getMovies(), genres})
    }
    handelSearch = query =>{
        this.setState({searchQuery:query,selectedGenre:null, currentPage:1 })
    }   
    handleSortItems = sortColumn =>{
        //sortcolumn assending and deseding by path
        this.setState({sortColumn})
    }
    handelGenreSelect = genre => {
        this.setState({selectedGenre:genre, searchQuery:'', currentPage:1})
    } 
    handleDelete = (movie) =>{
          console.log(movie)
        const movies = this.state.movies.filter(m => m._id !== movie._id);
         this.setState({movies})
    }  
    handleLiked = (movie) =>{
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
         movies[index]={...movies[index]}
         movies[index].liked = !movies[index].liked
         this.setState({movies})
    }
     handlePageChange = page => {
         this.setState({currentPage:page})
     }
    
     getPageData = () => {
        const {pageSize, currentPage,movies:allMovies,selectedGenre,searchQuery, sortColumn} = this.state;
        let filtered = allMovies;
        if(searchQuery)
           filtered = allMovies.filter(m => 
            m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            )
        else if(selectedGenre && selectedGenre._id)  
             filtered = allMovies.filter(m => m.genre._id === selectedGenre._id)
            //filtered by use sorting 
            const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
            const movies = Paginate(sorted, currentPage, pageSize)
            
            return {totalCount:filtered.length, data:movies}
    }

    render() { 
        //destructuring state
        const {length:count} = this.state.movies;
        const {pageSize, currentPage ,genres,selectedGenre, searchQuery,sortColumn} = this.state;
        if(count === 0)  return <p>There is no database</p>

         const {totalCount, data:movies} = this.getPageData()
               return (
            <div className="row">
                    <div className="col-3">
                       <ListGroup 
                       items={genres}
                       itemSelected={this.handelGenreSelect}
                       selectedItem={selectedGenre}
                        />
                    </div>
                    <div className="col">

                         <Link 
                         to="/movies/new"
                         className= 'btn btn-primary'
                         style={{marginBottom:20}}
                         >New Movie</Link>
                        <SearchBox  value={searchQuery} onChange={this.handelSearch}/>
                        <p>Showing {totalCount} movies in database</p>
                        <MoviesTable movies={movies} onLike={this.handleLiked} 
                        onDelete={this.handleDelete}
                        sortColumn={sortColumn}
                        onLiked={this.handleLiked}
                        onSort={this.handleSortItems}/>
                        <Pagination itemsCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}/>

                    </div>
            </div>  
         );
    }
}
 
export default Movies;