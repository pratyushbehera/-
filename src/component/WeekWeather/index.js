import React from 'react';

const WeekWeather = (props) => {
    return (
        <div className="row">
            <div className="col l12 s12">
                <div className="container">
                    <div className="card" style={{ backgroundColor: '#fff', borderRadius: '10px', marginTop: '3rem' }}>
                        <div className="card-content">
                            <h5 className="card-title">Weekly Forecast ({props.isLoading && <span className="loading">Too hot to handle</span>}{!props.isLoading && props.weekly.summary})</h5>
                            <br />
                            <div className="row">
                                <div className="col l3">
                                    <ul className="section table-of-contents">
                                        <li><span onClick={()=>props.setGraphType(0)} className={props.graphType === 0 ? "active" : ""}>Temperature</span></li>
                                        <li><span onClick={()=>props.setGraphType(1)}  className={props.graphType === 1 ? "active" : ""}>Precipitation</span></li>
                                        <li><span onClick={()=>props.setGraphType(2)}  className={props.graphType === 2 ? "active" : ""}>Wind</span></li>
                                        <li><span onClick={()=>props.setGraphType(3)}  className={props.graphType === 3 ? "active" : ""}>Humidity</span></li>
                                        <li><span onClick={()=>props.setGraphType(4)}  className={props.graphType === 4 ? "active" : ""}>Cloud Cover</span></li>
                                    </ul>
                                </div>
                                <div className="col l9 chartContainer">

                                    <canvas id="weeklyChart"></canvas>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
}

export default WeekWeather;