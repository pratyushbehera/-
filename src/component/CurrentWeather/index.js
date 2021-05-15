import React from 'react';
import Chip from './Chip';
import { GetIconUrl } from '../../utility';

const STYLE = {
    dailyCard: { backgroundColor: '#fff', borderRadius: '10px' },
    centerRowAlign: { display: 'flex', alignItems: 'flex-end' }
}

const currentWeather = (props) => {
    return (
        <div className="container" >
            <div className="row">
                <div className="col s12 l12">
                    <div className="card center-align" style={STYLE.dailyCard}>
                        <div className="card-content">
                            <div className="row" style={STYLE.centerRowAlign}>
                                <div className="col l4 m4 s12">
                                    {props.isLoading && <div className="loading" style={{ 'height': '80px' }}></div>}
                                    {!props.isLoading && <img className="responsive-img" src={GetIconUrl(props.currently.icon)} alt={props.currently.icon} style={{ 'width': '80px' }} />}
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
                                            new Date(props.currently.time * 1000).toLocaleString('en-US', { timeZone: props.timeZone })
                                        }</p>
                                </div>
                                <div className="col l8 m8 hide-on-small-only">

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

                            </div>
                            <div className="row">
                                <div className="col s12 show-on-small hide-on-med-and-up">
                                    <button className=" btn btn-small btn-floating" onClick={props.toggleExpansion}>
                                        <i className="material-icons">{!props.isExpanded ? "arrow_drop_down" : "arrow_drop_up"}</i>
                                    </button>
                                    <div className={"collapsible-body " + (props.isExpanded ? "displayBlock" :"") } style={{paddingTop: '40px',paddingBottom: '0'}}>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default currentWeather;