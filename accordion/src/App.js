import { useEffect, useState } from "react";
import axios from "axios";
const cityList = ["Sydney", "Brisbane", "Melbourne", "Perth"];
export default function App() {
  const [city, setCity] = useState("sydney");
  function handleCity(e) {
    setCity(e.target.value);
  }
  return (
    <div>
      <CityList city={city} onHandleCity={handleCity} />
      <Weather city={city} />
    </div>
  );
}
function CityList({ city, onHandleCity }) {
  return (
    <div>
      <h3>Select which city you would like to know</h3>
      <select value={city} onChange={onHandleCity}>
        {cityList.map((city) => (
          <option value={city} key={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
}
function Weather({ city }) {
  const [weather, setWeather] = useState("");
  useEffect(() => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=f1ae9669b74a49fdb42213857231109&q=${city}`
      )
      .then(function (response) {
        // handle success
        console.log("response", response.data);
        setWeather(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log("error", error);
      });
  }, [city]);
  return (
    <div className="weather">
      {weather && (
        <div>
          <p>
            {weather.location.name}, {weather.location.region},{" "}
            {weather.location.country} is at latitude: {weather.location.lat},
            longitude:{weather.location.lon}
          </p>
          <p>
            {weather.location.name}'s current temperature 🌡️:{" "}
            {weather.current.temp_c} degree
          </p>
          <p>
            {weather.location.name}'s current humidity:{" "}
            {weather.current.humidity} %
          </p>
          <p>
            {weather.location.name}'s current cloud level:{" "}
            {weather.current.cloud}
          </p>
        </div>
      )}
    </div>
  );
}
