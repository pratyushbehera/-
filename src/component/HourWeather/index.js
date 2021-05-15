import React from 'react';
import HourCard from './hourCard';

const STYLE = {
    hourlyCard:{ backgroundColor: '#14a76c', marginTop: '3rem' },
    hourCardSection:{ height: '190px', overflowX: 'scroll', display: 'flex', flexDirection: 'row' }
}

const HourWeather = (props) => {
    return (
        <div className="row">
            <div className="col l12 s12">
                <div className="card white-text" style={STYLE.hourlyCard}>
                    <div className="card-content  container">
                        <h5 className="card-title">
                            Hourly Forecast ({props.isLoading && <span className="loading">...</span>} 
                            {!props.isLoading && props.hourly.summary})</h5>
                        <br />
                        <div className="" style={STYLE.hourCardSection}>
                            { props.isLoading && <HourCard time="0" icon="sun" temperature="0" />}
                            {                             

                                !props.isLoading && props.hourly.data && props.hourly.data.slice(0,24).map((item, key) => {
                                    return (

                                       <HourCard key={key} time={item.time} icon={item.icon} temperature={item.temperature}/>

                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default HourWeather;