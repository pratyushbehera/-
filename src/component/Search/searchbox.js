import React from 'react';

const SearchBox = (props) => {
    return (
        <div className="row">
            <div className="col s12 m12 l12">
                <div className="input-field col s8 m8 l10">
                    <input id="search" name="place" type="text" placeholder="Search a place..." 
                    onChange={props.onChangeHandler} onKeyPress={props.keyPressHandler}/>
                </div>
                <div className="input-field col s2 m2 l2">
                    <button className="btn waves-effect waves-light" type="button" onClick={props.GetPlaceList}>Search
                            <i className="material-icons right">search</i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SearchBox;