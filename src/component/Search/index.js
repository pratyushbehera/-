import React from 'react'
import SearchBox from './searchbox';
import SearchResult from './searchresult';




const Search = (props) => {


  return (
    <div className="container">
      <div className="fixed-action-btn">
          <button className="btn btn-floating btn-large modal-trigger" data-target="searchModal">
            <i className="material-icons">search</i>
          </button>
        </div>

        <div id="searchModal" className="modal">
          <div className="modal-content">
            <h4>Search a place</h4>
            <SearchBox GetPlaceList={props.GetPlaceList} onChangeHandler={props.onChangeHandler} keyPressHandler={props.keyPressHandler}/>
            <SearchResult data={props.data} setCurrentPlace={props.setCurrentPlace} isLoading={props.isLoading}/>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat">Close</button>
          </div>
        </div>
    </div>

  )
}

export default Search;