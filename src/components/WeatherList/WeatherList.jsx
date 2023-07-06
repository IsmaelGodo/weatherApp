import React, { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard/WeatherCard";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import './WeatherList.css'

const WeatherList = () => {

  const [weather, setWeather] = useState([])

  useEffect(() => {
    const autotWeather = async () => {

      navigator.geolocation.getCurrentPosition(async (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        
        const getWeather = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat.toFixed(2)}&lon=${lon.toFixed(2)}&appid=${import.meta.env.VITE_API_KEY}`)
          const data = getWeather.data
    
          const cardData = data.list.map(elm => {
            const date = new Date(elm.dt * 1000);
            
            const weatherData = {
              "city" : data.city.name,
              "temperature": `${(elm.main.temp - 273.15).toFixed(2)} ºC`,
              "weather": elm.weather[0].main,
              "clouds": `${elm.clouds.all} %`,
              "date": date.toDateString(),
              "wind_speed": `${elm.wind.speed} m/s`,
              "time": `${date.getHours()}:${date.getMinutes()}`
            }
    
            return weatherData;
          });

          setWeather(cardData)
      })
    }
    autotWeather()
}, []);

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {

      const getWeather = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${event.target.city.value}&appid=${import.meta.env.VITE_API_KEY}`)
      const data = getWeather.data

      const finalData = data.list.map(elm => {

        const date = new Date(elm.dt * 1000);
        const weatherData = {
          "city" : data.city.name,
          "temperature": `${(elm.main.temp - 273.15).toFixed(2)} ºC`,
          "weather": elm.weather[0].main,
          "clouds": `${elm.clouds.all} %`,
          "date": date.toDateString(),
          "wind_speed": `${elm.wind.speed} m/s`,
          "time": `${date.getHours()}:${date.getMinutes()}`
        }

        return weatherData;
      });

      setWeather(finalData)

    } catch (error) {
      console.log("error");
    }
  }

  return <section>
    <form action="" onSubmit={handleSubmit}>
      <input type="text" placeholder="Ciudad" name="city" id="city"/>
      <button type="submit">Busqueda</button>
    </form>
    <div id="leyend"><h2>Leyenda:</h2><img src="../src/assets/termometro.png"/>:Temperatua<img src="../src/assets/tiempoA.png"/>:Atmosfera<img src="../src/assets/nubes.png"/>:%Nubes<img src="../src/assets/viento.png"/>:Vel. Viento</div>
    {weather.map((info, i) => <WeatherCard key={i} id={uuidv4()} time={info.time} temperature={info.temperature} weather={info.weather} clouds={info.clouds} date={info.date} wind_speed={info.wind_speed} city={info.city} />)}

  </section>;
};

export default WeatherList;