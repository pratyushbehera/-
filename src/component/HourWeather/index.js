import React from 'react';
import HourCard from './hourCard';

const STYLE = {
    alertCard: {
        background: '#8780cbb5',
        borderRadius: '10px', color: '#000'
    },
    hourCardSection: { height: '190px', overflowX: 'scroll', display: 'flex', flexDirection: 'row' }
}

const HourWeather = (props) => {
    return (

        <>
            <div className="card" style={STYLE.alertCard}>
                <div className="card-content">
                    {props.isLoading && <span className="loading">...</span>}
                    {!props.isLoading && ("Hourly Forecast: " + props.hourly.summary)}
                </div>
            </div>

            <div style={STYLE.hourCardSection}>
                {props.isLoading && new Array(8).fill(0).map((item, key) => {
                    return (
                        <HourCard key={key} time="0" icon="sun" temperature="0" isLoading={true} />
                    )
                })

                }
                {

                    !props.isLoading && props.hourly.data && props.hourly.data.slice(0, 24).map((item, key) => {
                        return (

                            <HourCard key={key} time={item.time} icon={item.icon} temperature={item.temperature} />

                        )
                    })
                }
            </div>

        </>

    );
}

export default HourWeather;