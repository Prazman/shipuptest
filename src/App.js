import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import load from "./xhr.js"
let openWeatherUrl = "http://api.openweathermap.org/data/2.5/weather"
let openWeatherKey = "39c69f3ef4fb87b25ac56fbeef4398ca"

function PageSelector(props){
  return (<div>
            <button value="weatherpage" onClick={props.onButtonClicked} > Weather </button>
            <button value="sunrisepage" onClick={props.onButtonClicked} > Sunrise/Sunset </button>
          </div>
            )
}
function UnitSelector(props){
  return (
    <div>
    <label for="unitInput"> Unit System </label>
    <select onChange={props.onSelectChange} id="unitInput" >
      <option value="metric" >Metric </option>
      <option value="imperial" > Imperial </option>
    </select>
    </div>
      )
}
function WeatherPage(props){

  if(props.weather){
    let temp;
    let wind_speed;
    if(props.unit == "metric"){
      temp = props.weather.main.temp + " °C"
      wind_speed = props.weather.wind.speed + " meter/sec";
    }
    else{
      temp = props.weather.main.temp + " °F"
       wind_speed = props.weather.wind.speed + " miles/hour";
    }

    return (
      <table className="table table-bordered">
        <tr> 
          <td>Temperature  </td>
          <td>{temp}</td>
        </tr>
        <tr> 
          <td> Weather description </td>
          <td>{props.weather.weather[0].description}</td>
        </tr>
        <tr> 
          <td> Wind Speed  </td>
          <td>{wind_speed}</td>
        </tr>
      </table>
          )
  }
  return <div> Loading</div>
}
function SunrisePage(props){

  if(props.weather){
    const sunrise = new Date(props.weather.sys.sunrise*1000).toLocaleTimeString()
    const sunset = new Date(props.weather.sys.sunset*1000).toLocaleTimeString()
    return (
      <table className="table table-bordered">
        <tr> 
          <td>Sunrise </td>
          <td> {sunrise.toString()}</td>
        </tr>
        <tr> 
          <td>Sunset </td>
          <td> {sunset.toString()}</td>
        </tr>
        
        </table>
          )
  }
  return <div> Loading</div>
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {time: new Date(),
                  unit:"metric",
                  page:"weatherpage"};
  }
  render() {
    let component
    let title
    if(this.state.page=="weatherpage"){
      title= "Weather"
      component = <WeatherPage unit={this.state.unit} weather={this.state.weather}></WeatherPage>
    }
    else{
      title = "Sunrise/Sunset"
      component = <SunrisePage weather={this.state.weather}></SunrisePage>
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ShipUp Front End Challenge</h1>
        </header>
        <PageSelector onButtonClicked={this.changePageState.bind(this)}></PageSelector>
        <UnitSelector onSelectChange={this.changeButtonState.bind(this)} unit={this.state.unit}></UnitSelector>
        <h2> {title} </h2>
        <div>Current Time: 
        <span>{this.state.time.toString()}</span>
        </div>
        {component}
        
      </div>
    );
  }
  componentDidMount(){
    this.fetchData(this.state.unit)
  }
  changeButtonState(event) {
    console.log('set to ' + event.target.value)
    this.setState({unit: event.target.value})
    this.fetchData(event.target.value)

}

fetchData(unit){
  let self = this
    load("GET",openWeatherUrl + "?q=Paris&units="+ unit+"&APPID="+openWeatherKey,null,function(response){
      self.setState({weather: JSON.parse(response.response), time:new Date()}) 
      console.log(self.state)
    },function(error){
      console.log(error);
    })
}
  changePageState(event){
this.setState({page: event.target.value})

}
}

export default App;
