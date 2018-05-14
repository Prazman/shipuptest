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

function UnitSelector(props){
  return (
      <select id="unitInput" value={props.unit}>
        <option value="metric" >Metric </option>
        <option value="imperial" > Imperial </option>
      </select>
      )
}
function WeatherPage(props){

  if(props.weather){
    return (
      <div id="weatherPage">
        <div> Current Temperature:  
        <span>{props.weather.main.temp - 273.15}</span></div>
        <div> Current Weather :
        <span>{props.weather.weather[0].description}</span>
        </div>
        <div> Current Wind Speed </div>
        <span>{props.weather.wind.speed}</span>
      </div>
          )
  }
  return <div> Loading</div>
}
function SunrisePage(props){

  if(props.weather){
    const sunrise = new Date(props.weather.sys.sunrise*1000)
    const sunset = new Date(props.weather.sys.sunset*1000)
    return (
      <div id="sunrisePage">
        <div> Sunrise at :  
        <span>{sunrise.toString()}</span></div>
        <div> Sunsets at :
        <span>{sunset.toString()}</span>
        </div>
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

        <UnitSelector unit={this.state.unit}></UnitSelector>
        <div>Current Time: 
        <span>{this.state.time.toString()}</span>
        </div>
        <WeatherPage weather={this.state.weather}></WeatherPage>
        <SunrisePage weather={this.state.weather}></SunrisePage>
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
