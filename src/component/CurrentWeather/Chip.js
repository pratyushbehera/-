import React from 'react';

const Chip = (props) => {
    return (
        <div className="col l3 m4 s4" style={{height:'60px'}}>
            <div className="headingChip">
                {props.name}</div>
            <div className="dataChip">
                {props.isLoading && <span className="loading"> 0 </span>}
                {!props.isLoading && <span> {props.data[props.attr]} </span>}
            </div>
        </div>
    );
}

export default Chip;