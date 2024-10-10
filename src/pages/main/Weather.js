import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

    useEffect(() => {
        const fetchWeatherData = async (lat, lon) => {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;
            try {
                console.log("entered into try");
                const response = await axios.get(apiUrl);
                // Forced conversion of "Seoul" and "Uijeongbu" to Korean (add other regions if necessary)
                let cityName = response.data.name;
                if (cityName === "Seoul") {
                    cityName = "서울";
                } else if (cityName === "Uijeongbu-si") {
                    cityName = "의정부시";
                }
                setWeatherData({ ...response.data, name: cityName });
                setLoading(false);
            } catch (error) {
                setError('날씨 정보를 가져오는 데 실패했습니다.');
                setLoading(false);
            }
        };

        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        fetchWeatherData(latitude, longitude);
                    },
                    () => {
                        setError('위치 정보를 가져오는 데 실패했습니다.');
                        setLoading(false);
                    }
                );
            } else {
                setError('Geolocation이 지원되지 않는 브라우저입니다.');
                setLoading(false);
            }
        };

        getLocation();
    }, [API_KEY]);

    if (loading) {
        return <div></div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="weather-container">
            <div className="weather-box">
                <p className="city-name">{weatherData.name}</p>
                <p className="temperature">{Math.round(weatherData.main.temp)}°C</p> 
            </div>
        </div>
    );
};

export default Weather;
