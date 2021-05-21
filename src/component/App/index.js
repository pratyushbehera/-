import React from "react";
import M from 'materialize-css';
import Helmet from "react-helmet";
import Header from '../Header';
import Body from '../Body';
import Footer from '../Footer';
import Search from '../Search';
import Error from '../Error';
import { GetWeeklyGraph } from '../../utility';
import Notify from '../../utility/notification';
import DataAccess from '../../data';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      isExpanded: false,
      currentPlace: '',
      weather: {},
      graphType: 0,
      searchKey: "",
      isSearchLoading: false,
      searchResult: null,
    };

    this.GetPlaceByIP = this.GetPlaceByIP.bind(this);
    this.GetWeatherByPlace = this.GetWeatherByPlace.bind(this);
    this.SetGraphType = this.SetGraphType.bind(this);
    this.toggleExpansion = this.toggleExpansion.bind(this);
    this.GetPlaceList = this.GetPlaceList.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.setCurrentPlace = this.setCurrentPlace.bind(this);
    this.keyPressHandler = this.keyPressHandler.bind(this);
    this.enableNotification = this.enableNotification.bind(this);
    this.showNotificationPermission = this.showNotificationPermission.bind(this);

    this.updateCurrentPlace = this.updateCurrentPlace.bind(this);
    this.seekPermission = this.seekPermission.bind(this);
  }

  componentDidMount() {
    document.addEventListener('DOMContentLoaded', function () {
      M.Modal.init(document.querySelectorAll('.modal'), {});
    });


    navigator.permissions.query({ name: 'geolocation' })
      .then(({ state }) => {
        if (state === "prompt") {

          var toastHTML = `<span>App will access your location. You can change the settings later</span>`;
          M.toast({ html: toastHTML });
        }

        this.getWeatherByLocation();
      });
  }

  componentWillUnmount() {
    let instances;
    document.removeEventListener('DOMContentLoaded', function () {
      instances = M.Modal.init(document.querySelectorAll('.modal'), {});
    });
    if (instances)
      instances.destroy();
  }

  async GetPlaceByIP() {
    let dal = new DataAccess();
    let place = await dal.GetCurrentPlace();
    if (place instanceof Error) {
      var toastHTML = '<span>Some error occurred</span>';
      M.toast({ html: toastHTML });
    }
    else {
      this.GetWeatherByPlace(`${place.city}, ${place.region}`);
      this.setState({
        currentPlace: `${place.city}, ${place.region}`
      });
    }
  }

  async GetWeatherByPlace(place) {
    let dal = new DataAccess();
    let data = await dal.GetWeatherByPlace(place);
    if (data instanceof Error) {
      var toastHTML = '<span>Some error occurred</span>';
      M.toast({ html: toastHTML });
      this.setState({isError:true});
    }
    else {
      this.setState({
        isError:false,
        isLoading: false,
        weather: data
      });
      GetWeeklyGraph(this.state.weather.daily, this.state.graphType);
    }
  }

  componentDidCatch(){
    this.setState({isError:true});
  }

  async GetPlaceList(event) {
    let dal = new DataAccess();
    let toastHTML;
    this.setState({
      isSearchLoading: true
    });
    let data = await dal.GetPlaceList(this.state.searchKey);
    if (data instanceof Error) {
      toastHTML = '<span>No place found</span>';
      M.toast({ html: toastHTML });
    }
    else {
      this.setState({
        isSearchLoading: false,
        searchResult: !data.Error ? data : []
      });
    }
  }

  SetGraphType(type) {
    this.setState({
      graphType: type
    })
    GetWeeklyGraph(this.state.weather.daily, type);
  }

  toggleExpansion() {
    this.setState(prev => ({
      isExpanded: !prev.isExpanded
    }));
  }

  onChangeHandler(ev) {
    this.setState({
      searchKey: ev.target.value
    });

  }

  keyPressHandler(ev) {
    if (ev.key === "Enter")
      this.GetPlaceList();
  }

  setCurrentPlace(place) {
    this.setState({
      currentPlace: place,
      isLoading: true,
    });
    this.GetWeatherByPlace(place);

    let instances = M.Modal.init(document.querySelectorAll('.modal'), {});
    instances[0].close();
    document.querySelectorAll('body')[0].attributes[0].nodeValue = "overflow: visible;"
  }

  enableNotification() {
    let notification = new Notify();
    notification.createNotification();
  }

  showNotificationPermission() {
    //To be implemented
  }

  seekPermission(error) {
    let errorMsg = "";
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMsg = "Location access denied. Accessing location from IP";
        break;
      case error.POSITION_UNAVAILABLE:
        errorMsg = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        errorMsg = "The request to get your location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        errorMsg = "An unknown error occurred.";
        break;
      default:
        break;
    }
    var toastHTML = `<span>${errorMsg}</span>`;
    M.toast({ html: toastHTML });

    this.GetPlaceByIP();
  }

  getWeatherByLocation() {
    navigator.permissions.query({ name: 'geolocation' })
      .then(({ state }) => {
        if (state === "granted" || state === "prompt") {
          navigator.geolocation.getCurrentPosition(this.updateCurrentPlace, this.seekPermission);
        }
        else {
          this.GetPlaceByIP();
        }
      });
  }

  async updateCurrentPlace(position) {
    let coordinates = { 'Latitude': position.coords.longitude, 'Longitude': position.coords.latitude };
    let dal = new DataAccess();
    let res = await dal.GetPlaceByCoordinates(coordinates);
    if (res instanceof Error) {
      var toastHTML = res.toString();
      M.toast({ html: toastHTML });
    }
    else {
      if (res.place)
        this.GetWeatherByPlace(`${res.place}`);
      this.setState({
        currentPlace: `${res.place}`
      });
    }
  }

  render() {
    let renderTitle = this.state.currentPlace;
    return (
      <>
        <Helmet>
          <title>{renderTitle ? (renderTitle + " | Weather App") : "Weather App"}</title>
        </Helmet>
        <Header isLoading={this.state.isLoading} />
        { !this.state.isError ?
        (<>
        <Body isLoading={this.state.isLoading} isExpanded={this.state.isExpanded} currentPlace={this.state.currentPlace}
          timeZone={this.state.weather.timezone} currently={this.state.weather.currently}
          hourly={this.state.weather.hourly} weekly={this.state.weather.daily}
          graphType={this.state.graphType} SetGraphType={this.SetGraphType}
          toggleExpansion={this.toggleExpansion} />
        <Search GetPlaceList={this.GetPlaceList} onChangeHandler={this.onChangeHandler} keyPressHandler={this.keyPressHandler}
          data={this.state.searchResult} setCurrentPlace={this.setCurrentPlace} isLoading={this.state.isSearchLoading} />
          </>
        ) : <Error/>}

        <Footer />
      </>
    );
  }
}
