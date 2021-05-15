import React from 'react';
import CurrentWeather from '../CurrentWeather';
import HourWeather from '../HourWeather';
import WeekWeather from '../WeekWeather';


const STYLE = {
    moveTop: {
        position: 'relative', top: '-10rem', marginBottom: '-4rem'
    }
}

const Body = (props) => {

    return (

        <main style={STYLE.moveTop}>
            <CurrentWeather currently={props.currently} timeZone={props.timeZone} isLoading={props.isLoading} isExpanded={props.isExpanded} toggleExpansion={props.toggleExpansion} />
            <HourWeather isLoading={props.isLoading} timeZone={props.timeZone} hourly={props.hourly} />
            <WeekWeather isLoading={props.isLoading} weekly={props.weekly} graphType={props.graphType} setGraphType={props.SetGraphType} />
        </main>
    );
}

export default Body;
