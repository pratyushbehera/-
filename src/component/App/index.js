import React from "react";
import M from 'materialize-css';
import Helmet from "react-helmet";
import Header from '../Header';
import Body from '../Body';
import Footer from '../Footer';
import Search from '../Search';
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
      searchResult: [],
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
  }
  
  componentDidMount() {
    this.GetPlaceByIP();
    let instances;
    document.addEventListener('DOMContentLoaded', function () {
      instances = M.Modal.init(document.querySelectorAll('.modal'), {});
    });
  }
  
  componentWillUnmount(){
    let instances;
    document.removeEventListener('DOMContentLoaded', function () {
      instances = M.Modal.init(document.querySelectorAll('.modal'), {});
    });
    if(instances)
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
    }
    else {
      this.setState({
        isLoading: false,
        weather: data
      });
      GetWeeklyGraph(this.state.weather.daily, this.state.graphType);
    }
  }

  async GetPlaceList(event) {
    let dal = new DataAccess();
    this.setState({
      isSearchLoading: true
    });
    let data = await dal.GetPlaceList(this.state.searchKey);
    if (data instanceof Error) {
      var toastHTML = '<span>Some error occurred</span>';
      M.toast({ html: toastHTML });
    }
    else {
      this.setState({
        isSearchLoading: false,
        searchResult: data
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

  enableNotification(){    
    let notification = new Notify();
    notification.createNotification();
  }

  showNotificationPermission(){
    //To be implemented
  }

  render() {
    let renderTitle = this.state.currentPlace;
    return (
      <>
        <Helmet>
          <title>{renderTitle} | Weather App</title>
        </Helmet>
        <Header isLoading={this.state.isLoading} currentPlace={this.state.currentPlace} />
        <Body isLoading={this.state.isLoading} isExpanded={this.state.isExpanded}
          timeZone={this.state.weather.timezone} currently={this.state.weather.currently}
          hourly={this.state.weather.hourly} weekly={this.state.weather.daily}
          graphType={this.state.graphType} SetGraphType={this.SetGraphType}
          toggleExpansion={this.toggleExpansion} />
        <Search GetPlaceList={this.GetPlaceList} onChangeHandler={this.onChangeHandler} keyPressHandler={this.keyPressHandler}
          data={this.state.searchResult} setCurrentPlace={this.setCurrentPlace} isLoading={this.state.isSearchLoading} />

        <Footer />
      </>
    );
  }
}
