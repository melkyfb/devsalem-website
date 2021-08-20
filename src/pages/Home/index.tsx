import React from 'react';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import * as IPInfoClient from '../../clients/IPInfoClient';

const Home = () => {

    const [latt, setLatt] = React.useState<number>();
    const [long, setLong] = React.useState<number>();
    const [weatherText, setWeatherText] = React.useState<string>();
    const [showWeather, setShowWeather] = React.useState<boolean>(false);

    React.useEffect(() => {
        async function getIPInfo () {
            try {
                const geoLocation = await IPInfoClient.getIPInfo();
                setWeatherText(`Weather for ${geoLocation.city}`);
                setLatt(geoLocation.latitude);
                setLong(geoLocation.longitude);
                setShowWeather(true);
            } catch (e) {
                setShowWeather(false);
            }
        };
        getIPInfo();
    }, []);

    return (
        <Container>
            <Alert show={showWeather}>{weatherText}</Alert>
        </Container>
    );
}

export default Home;