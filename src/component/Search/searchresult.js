import React from 'react';
import List from './list';

const SearchResult = (props) => {
    return (
        <div className="row">
        <div className="col s12 m12 l12" style={{ minHeight: '10rem' }}>
          <ul className={"collection " + (props.isLoading? "loading" : "")}>
            {props.data && props.data.map((item, key) =>               
              <List key={key} place={item.place_name} setCurrentPlace={props.setCurrentPlace} />
            )}
          </ul>
        </div>
      </div>
    );
}

export default SearchResult;