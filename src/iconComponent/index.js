import React from 'react';
import ClearDayIcon from './clear-day';
import ClearNightIcon from './clear-night';
import RainIcon from './rain';
import SnowIcon from './snow';
import SleetIcon from './sleet';
import WindIcon from './wind';
import FogIcon from './fog';
import CloudyIcon from './cloudy';
import PartlyCloudyIcon from './partly-cloudy-day';
import PartlyCloudyNightIcon from './partly-cloudy-night';

const IconComponent = (props) => {
    let component;
    switch (props.icon) {
        case "clear-day":
            component = <ClearDayIcon />
            break;
        case "clear-night":
            component = <ClearNightIcon />
            break;
        case "rain":
            component = <RainIcon />
            break;
        case "snow":
            component = <SnowIcon />
            break;            
        case "sleet":
            component = <SleetIcon />
            break;
                       
        case "fog":
            component = <FogIcon />
            break;          
        case "wind":
            component = <WindIcon />
            break;
        case "partly-cloudy-day":
            component = <PartlyCloudyIcon />
            break;
        case "partly-cloudy-night":
            component = <PartlyCloudyNightIcon />
            break;
        case "cloudy":
            component = <CloudyIcon />
            break;
        default:
            component = <div> Loading your Icon</div>
            break;
    }
    return component;
}

export default IconComponent;