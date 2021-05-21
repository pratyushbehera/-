import React from 'react';
import IconComponent from '../../iconComponent/';
import Chip from '../CurrentWeather/Chip'

const STYLE = {
    dailyCard: { backgroundColor: '#fff', borderRadius: '10px' },
    centerRowAlign: { display: 'flex', alignItems: 'flex-end' }
}

const currentWeather = (props) => {
    return (
        
                    <div className={"card center-align " + (!props.isLoading ? props.currently.icon + (props.isExpanded? " fullscreen": "") : "loading")} style={STYLE.dailyCard}>
                        <div className="card-content">
                            <div onClick={props.toggleExpansion} style={{ position : 'absolute', top: '5px', right: '5px',cursor:"pointer"}}>
                                { props.isExpanded ? <i className="material-icons">fullscreen_exit</i> : <i className="material-icons">fullscreen</i>}
                            </div>
                            {props.isLoading && <div className="loading"></div>}
                            {!props.isLoading &&
                                <IconComponent icon={props.currently.icon} />
                            }
                            <div style={{ 'marginTop': '2.5rem' }}>
                                <h5 style={{ 'margin': '0px' }}>
                                    {props.isLoading && <span className="loading">0</span>}
                                    {!props.isLoading && props.currently.temperature}&deg;C
                            </h5>
                                <p>Real Feel &nbsp;
                                        {props.isLoading && <span className="loading">0</span>}
                                    {!props.isLoading && props.currently.apparentTemperature}&deg;C</p>
                                <p>{props.isLoading && <span className="loading">Too Hot weather</span>}{!props.isLoading && props.currently.summary}</p>
                                <p>
                                    {props.isLoading && <span className="loading">0</span>}
                                    {!props.isLoading &&
                                        <>
                                            {props.currentPlace}
                                            <br/>
                                            {new Date(props.currently.time * 1000).toLocaleString('en-US', { timeZone: props.timeZone })}
                                        </>
                                    }
                                </p>
                                
                                    {
                                        props.isExpanded ? 
                                    <div className="row"> 
                                        <br/>
                                        <Chip name="Precipitation Intensity" attr="precipIntensity" data={props.currently} isLoading={props.isLoading} />
                            <Chip name="Humidity" attr="humidity" data={props.currently} isLoading={props.isLoading} />
                            <Chip name="Visibility" attr="visibility" data={props.currently} isLoading={props.isLoading} />
                            <Chip name="Pressure" attr="pressure" data={props.currently} isLoading={props.isLoading} />
                            <Chip name="UV Index" attr="uvIndex" data={props.currently} isLoading={props.isLoading} />
                            <Chip name="Ozone" attr="ozone" data={props.currently} isLoading={props.isLoading} />
                            <Chip name="Cloud Cover" attr="cloudCover" data={props.currently} isLoading={props.isLoading} />
                            <Chip name="Dew Point" attr="dewPoint" data={props.currently} isLoading={props.isLoading} />
                            <Chip name="Wind Bearing" attr="windBearing" data={props.currently} isLoading={props.isLoading} />
                            <Chip name="Wind Gust" attr="windGust" data={props.currently} isLoading={props.isLoading} />
                            <Chip name="Precipitation Probability" attr="precipProbability" data={props.currently} isLoading={props.isLoading} />
                            <Chip name="Wind Speed" attr="windSpeed" data={props.currently} isLoading={props.isLoading} />
                                    </div> 
                                    
                                    : null}
                                
                            </div>
                        </div>
                    </div>



    );
}

export default currentWeather;