import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export function GetIconUrl(icon) {
    return `../img/${icon}.svg`;
    //return `http://openweathermap.org/img/wn/${icon}@2x.png`;
}

export function GetHourOnly(time,timeZone){
    let hour = new Date(time * 1000).getHours();
    if(hour> 12){
        hour = hour - 12;
        return `${hour} PM`;
    }
    return `${hour} AM`;
}

const GetDay = (dateObj) => {
    var date = new Date(dateObj.time * 1000).getDay();
    let day = "";
    switch (date) {
        case 0:
            day = "Sunday"; break;

        case 1:
            day = "Monday"; break;

        case 2:
            day = "Tuesday"; break;

        case 3:
            day = "Wednesday"; break;

        case 4:
            day = "Thursday"; break;

        case 5:
            day = "Friday"; break;

        case 6:
            day = "Saturday"; break;

        default:
            day = ""; break;

    }
    return day;
}

const GRAPH = {
    options: {
        responsive: true,

        plugins: {
            legend: {
                labels: {
                    color: "black",
                    fontSize: 18
                }
            },
        },

        scales: {
            y: {
                ticks: {
                    color: "black",
                    font: 18,
                }
            },
            x: {
                ticks: {
                    color: "black",
                    font: 14,
                }
            }
        }
    }
}

const GraphDataset = (weather, name, prop) => {
    return {
        label: name,
        data: weather.data.map(i => i[prop]),
        backgroundColor: ['rgba(20, 167, 108, 0.2)'],
        borderColor: ['rgba(20, 167, 108, 1)'],
        borderWidth: 1
    };
}
let weeklyChart;
export function GetWeeklyGraph(weekly, type) {
    if (weeklyChart) weeklyChart.destroy();
    const Datasets = CreateDataset(weekly, type);
    let elem = document.getElementById('weeklyChart');
    if (elem !== null && elem !== undefined) {
        let ctx = elem.getContext('2d');
        weeklyChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: weekly.data.map(i => GetDay(i)),
                datasets: Datasets
            },
            options: GRAPH.options
        });
    }
}

const CreateDataset = (weekly, type) => {
    let dataset;
    switch (type) {
        case 0:
            dataset = [GraphDataset(weekly, 'Temp High', 'temperatureHigh'),
            GraphDataset(weekly, 'Temp Low', 'temperatureLow')];
            break;
        case 1:
            dataset = [GraphDataset(weekly, 'Precipitation Probability', 'precipProbability'),
            GraphDataset(weekly, 'Precipitation Intensity', 'precipIntensity')];
            break;
        case 2:
            dataset = [GraphDataset(weekly, 'Wind Speed', 'windSpeed')];
            break;
        case 3:
            dataset = [GraphDataset(weekly, 'Humidity', 'humidity')];
            break;
        case 4:
            dataset = [GraphDataset(weekly, 'Cloud Cover', 'cloudCover')];
            break;

        default:
            dataset = [GraphDataset(weekly, 'Temp High', 'temperatureHigh'),
            GraphDataset(weekly, 'Temp Low', 'temperatureLow')];
            break;
    }
    return dataset;
}

export const InstallServiceWorker = async () => {
    const register = await navigator.serviceWorker.register("sw.js", {
        scope: "/"
      });
      return register;
}

