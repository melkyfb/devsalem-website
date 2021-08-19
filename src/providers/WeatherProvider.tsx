type WeatherDayType = {
    weatherDescription: string,
    weatherabbreviation: string,
    temperature: number,
}

type WeatherProviderReturnType = {
    LocationName: string,
    weather: Array<WeatherDayType>
};

const WeatherProvider = (locationQuery?: string, geoLocation?: [number, number]): WeatherProviderReturnType => {
    if (!locationQuery && !geoLocation) {
        throw new Error('This function should be called containing at least one parameter.');
    }
}

export default WeatherProvider;