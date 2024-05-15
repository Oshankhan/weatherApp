import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [apiData, setApiData] = useState(null); // Initialize apiData as null instead of an empty string
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");

  const arr = [
    {
      heading: "Temperature",
      query: "temp_c",
    },
    {
      heading: "Humidity",
      query: "humidity",
    },
    {
      heading: "Condition",
      query: "condition.text",
    },
    {
      heading: "Wind Speed",
      query: "wind_kph",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=7b7a2d3d61d643119bc200609242402&q=${city}&aqi=no`
      );
      const data = await response.json();
      setApiData(data);
    } catch (err) {
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  const getNestedProperty = (obj, path) => {
    const properties = path.split(".");
    return properties.reduce((prev, curr) => prev && prev[curr], obj);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          required
        />
        <button type="submit">Search</button>
      </form>
      <div className="weather-cards">
        {loading ? (
          <p>Loading data…</p>
        ) : apiData ? (
          <>
            {arr.map((item, index) => (
              <div className="weather-card" key={index}>
                <h5>{item.heading}</h5>
                <p>
                  {JSON.stringify(
                    getNestedProperty(apiData.current, item.query)
                  )}
                </p>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default App;
