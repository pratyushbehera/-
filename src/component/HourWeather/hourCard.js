import React from 'react';
import { GetIconUrl, GetHourOnly } from '../../utility';

const STYLE = {
    hourCard: {
        width: '125px',
        height: '150px',
        margin: '5px',
        color: 'rgba(0,0,0,0.6)',
        backgroundColor: '#e4e4e4',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    hourTimeSize: {
        fontSize: '12px'
    },
    hourImgSize: { width: '30px', height: '30px' }
}

const HourCard = (props) => {
    return (
        <div className={"card left " + (props.isLoading ? "loading": "")} style={STYLE.hourCard}>
            <span style={STYLE.hourTimeSize}>
                {GetHourOnly(props.time)}
            </span>
            <img src={GetIconUrl(props.icon)} alt={props.icon} style={STYLE.hourImgSize} />
            <div className="card-title">{props.temperature}&deg;C</div>
        </div>
    );
}
export default HourCard;