import React from "react";
import './WeatherCard.css'

const WeatherCard = ({ temperature, weather, clouds, date, wind_speed, city, time, id }) => {
  return <section id={id}>

    <ul className="data-container">
      <li><h2>{city}</h2></li>
      <li><h3>{date} {time}</h3></li>
      <li><img src="../src/assets/termometro.png"/>{temperature}</li>
      <li><img src="../src/assets/tiempoa.png"/>{weather}</li>
      <li><img src="../src/assets/nubes.png"/>{clouds}</li>
      <li><img src="../src/assets/viento.png"/>{wind_speed}</li>
    </ul>
  </section>;
};

export default WeatherCard;