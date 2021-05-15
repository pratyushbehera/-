import React from 'react';

const List = (props) => {
    return (
        <a className="collection-item" href="#!" onClick={()=>props.setCurrentPlace(props.place)}>
            
            {props.place && props.place}
            
        </a>
    );
}

export default List;