import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
let openWeatherUrl = "http://api.openweathermap.org/data/2.5/weather"
let openWeatherKey = "39c69f3ef4fb87b25ac56fbeef4398ca"
function load(method, url, data, successcallback, errorcallback) {
    var xhr;

    xhr = new XMLHttpRequest();


    xhr.onreadystatechange = ensureReadiness;

    function ensureReadiness() {
        if (xhr.readyState < 4) {
            return;
        }

        if (xhr.status !== 200) {
            errorcallback(xhr);
            return;
        }

        // all is well  
        if (xhr.readyState === 4) {
            successcallback(xhr);
        }
    }

    xhr.open(method, url, true);
    if (method == "POST") {
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        var params = typeof data == 'string' ? data : Object.keys(data).map(
            function(k) {
                var datastring = (data[k])?encodeURIComponent(data[k]):'';
                return encodeURIComponent(k) + '=' + datastring;
            }
        ).join('&');

        xhr.send(params);
    } else {
        xhr.send();
    }
}
/*class UnitInput extends Component{
    constructor(props) {
    super(props);
    this.state = {unit: "imperial"};
  }
  render(){
    return (
      <select id="unitInput" value={(this.state.unit=="metric")}>
        <option value="metric" >Metric </option>
        <option vamue="imperial" > Imperial </option>
      </select>
      )
  }
}
class WeatherPage extends Component{
  constructor(props) {
    super(props);
    this.weather = {};
  }
  render(){
    return (
      <div id="weatherPage">
        <div>Current Time</div>
        <div> Current Temperature </div>
        <div> Current Weather </div>
        <div> Current Wind Speed </div>
      </div>
          )
  }
}*/
function UnitSelector(props){
  return (
      <select id="unitInput" value={props.unit}>
        <option value="metric" >Metric </option>
        <option value="imperial" > Imperial </option>
      </select>
      )
}
function WeatherPage(props){
  console.log(props);
  if(props.weather){
    return (
      <div id="weatherPage">
        <div>Current Time: 
        <span>{props.time.toString()}</span>
        </div>
        <div> Current Temperature:  
        <span>{props.weather.main.temp - 273.15}</span></div>
        <div> Current Weather :
        <span>{props.weather.weather[0].description}</span>
        </div>
        <div> Current Wind Speed </div>
      </div>
          )
  }
  return <div> Loading</div>
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {time: new Date(),
                  unit:"metric"};
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ShipUp Front End Challenge</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <UnitSelector unit={this.state.unit}></UnitSelector>
        <WeatherPage weather={this.state.weather} time={this.state.time}></WeatherPage>

      </div>
    );
  }
  componentDidMount(){
    let self = this
    load("GET",openWeatherUrl + "?q=Paris&APPID="+openWeatherKey,null,function(response){
      self.setState({weather: JSON.parse(response.response),loaded:true}) 
      console.log(self.state)
    },function(error){
      console.log(error);
    })
  }
  
}

export default App;
