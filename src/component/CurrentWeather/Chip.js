import React from 'react';

const Chip = (props) => {
    return (
        <div className="chip">
            <i className="material-icons">info</i>
            <small>{props.name}</small> : 
            {props.isLoading && <span className="loading"> 0 </span>}
            {!props.isLoading && <span> {props.data[props.attr]} </span>}
        </div>
    );
}

export default Chip;