import React from 'react';
import { GetHourOnly } from '../../utility';
import IconComponent from '../../iconComponent/';

const STYLE = {
    hourCard: {
        width: '125px',
        height: '150px',
        margin: '10px 20px 0 0',
        color: 'rgba(0,0,0,0.6)',
        backgroundColor: '#e4e4e4',
        borderRadius: '10px',        
        padding: '24px',
        boxShadow: '1px 1px 10px rgb(19 19 20)'
        
    },
    hourTimeSize: {
        fontSize: '12px'
    },
    hourImgSize: { transform: 'scale(0.5)' }
}

const HourCard = (props) => {
    return (
        <div className={"card left " + (props.isLoading ? "loading" : props.icon)} style={STYLE.hourCard}>
            
            <div style={STYLE.hourImgSize}>
                <IconComponent icon={props.icon} />
            </div>
            <div className="card-title">{props.temperature}&deg;C</div>
            <span style={STYLE.hourTimeSize}>
                {GetHourOnly(props.time)}
            </span>
        </div>
    );
}
export default HourCard;