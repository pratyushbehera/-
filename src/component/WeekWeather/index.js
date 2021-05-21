import React from 'react';

const STYLE = {
    alertCard: {
        background: '#8780cbb5',
        borderRadius: '10px', color: '#000'
    }
}

const WeekWeather = (props) => {
    return (
        <>
            <div className="card" style={STYLE.alertCard}>
                <div className="card-content">
                    {props.isLoading && <span className="loading">...</span>}
                    {!props.isLoading && ("Weekly Forecast: " + props.weekly.summary)}
                </div>
            </div>
            <div>
                <ul className="section table-of-contents">
                    <li><span onClick={() => props.setGraphType(0)} className={props.graphType === 0 ? "active" : ""}>Temperature</span></li>
                    <li><span onClick={() => props.setGraphType(1)} className={props.graphType === 1 ? "active" : ""}>Precipitation</span></li>
                    <li><span onClick={() => props.setGraphType(2)} className={props.graphType === 2 ? "active" : ""}>Wind</span></li>
                    <li><span onClick={() => props.setGraphType(3)} className={props.graphType === 3 ? "active" : ""}>Humidity</span></li>
                    <li><span onClick={() => props.setGraphType(4)} className={props.graphType === 4 ? "active" : ""}>Cloud Cover</span></li>
                </ul>
            </div>
            <div className="card" style={{ borderRadius: '10px',boxShadow: '0 0 5px 2px #0c0c0c77',marginTop: '2rem' }}>
                
                    <div className="chartContainer">

                        <canvas id="weeklyChart"></canvas>

                    </div>
                

            </div>

        </>

    );
}

export default WeekWeather;