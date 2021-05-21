import React from 'react';
import CurrentWeather from '../CurrentWeather';
import HourWeather from '../HourWeather';
import WeekWeather from '../WeekWeather';

const Body = (props) => {

    return (

        <main>
            <div className="container" >
                <div className="row">
                    <div className="col l4 m6 s12">
                        <CurrentWeather currently={props.currently} currentPlace={props.currentPlace} timeZone={props.timeZone} isLoading={props.isLoading} isExpanded={props.isExpanded} toggleExpansion={props.toggleExpansion} />
                    </div>
                    <div className="col l8 m6 s12">
                        <HourWeather isLoading={props.isLoading} timeZone={props.timeZone} hourly={props.hourly} />
                    </div>
                </div>
                <div className="row">
                    <div className="col l12 m12 s12">
                        <WeekWeather isLoading={props.isLoading} weekly={props.weekly} graphType={props.graphType} setGraphType={props.SetGraphType} />
                    </div>
                </div>
            </div>
            <div className={"overlay " + (props.isExpanded? "displayBlock":"displayNone")}></div>
        </main>
    );
}

export default Body;
