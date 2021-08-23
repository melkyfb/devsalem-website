import React from 'react';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import IPInfoClient from '../../clients/IPInfoClient';
import MetaWeatherClient from '../../clients/MetaWeatherClient';

const Home = () => {
    const [city, setCity] = React.useState<string|null>();
    const [temp, setTemp] = React.useState<number|null>();
    const [minTemp, setMinTemp] = React.useState<number|null>();
    const [maxTemp, setMaxTemp] = React.useState<number|null>();
    const [dateTemp, setDateTemp] = React.useState<string|null>();
    const [weatherState, setWeatherState] = React.useState<string|null>();
    const [weatherText, setWeatherText] = React.useState<string>();
    const [showWeather, setShowWeather] = React.useState<boolean>(false);

    React.useEffect(() => {
        async function getIPInfo () {
            try {
                const geoLocation = await IPInfoClient.getIPInfo();
                setCity(geoLocation.city);
                const weather = await MetaWeatherClient.getWeatherFor({geoLocation: [geoLocation.latitude, geoLocation.longitude]});
                if (!city) {
                    setCity(weather.title)
                }
                const currentWeather = weather.consolidated_weather[0];
                setTemp(currentWeather.the_temp.toFixed(1));
                setMinTemp(currentWeather.min_temp.toFixed(1));
                setMaxTemp(currentWeather.max_temp.toFixed(1));
                setDateTemp(currentWeather.applicable_date);
                setWeatherState(currentWeather.weather_state_name);
            } catch (e) {
                setShowWeather(false);
            }
        };
        getIPInfo();
    }, []);

    React.useEffect(() => {
        if (city && temp && minTemp && maxTemp && dateTemp && weatherState) {
            setShowWeather(false);
            setWeatherText(`Weather ${weatherState} for ${city} at ${dateTemp} - Temperature ${temp}°C (Min: ${minTemp}°C - Max: ${maxTemp}°C)`);
            setShowWeather(true);
        }
    }, [city, temp, minTemp, maxTemp, temp, dateTemp, weatherState]);

    return (
        <Container>
            <Alert show={showWeather}>{weatherText}</Alert>
        </Container>
    );
}

export default Home;