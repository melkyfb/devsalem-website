import {MetaWeatherReturnType} from '../types/MetaWeatherReturnType';

type LocationSearchResponseType = {    
    title: string,
    location_type: string,
    latt_long: [number, number],
    woeid: number,
    distance: number
}

type WeatherPropsType = {
    locationQuery?: string,
    geoLocation?: [number, number]
}

const MetaWeatherAPIURL = 'https://metaweather-with-cors.vercel.app/api/';
const MetaWeatherAPIURLLocation = `${MetaWeatherAPIURL}location/`;
const MetaWeatherAPIURLLocationSearch = `${MetaWeatherAPIURLLocation}search/`; 

const getSearchUrl = (locationQuery?: string, geoLocation?: [number, number]): string => {
    if (!locationQuery && !geoLocation) {
        throw new Error('This function should be called containing at least one parameter.');
    }

    let url = locationQuery
        ? `${MetaWeatherAPIURLLocationSearch}?query=${locationQuery}`
        : `${MetaWeatherAPIURLLocationSearch}?lattlong=${geoLocation?.join(',')}`;

    return url;
}

const getNearestWOEID = async (url: string): Promise<number> => {
    const response: LocationSearchResponseType[] = await fetch(url).then(r => r.json());
    return response.length > 0 ? response[0].woeid : -1;
}

const getWeatherForWOEID = async (woeid: number): Promise<MetaWeatherReturnType> => {
    const url = `${MetaWeatherAPIURLLocation}${woeid}`;
    const resp = await fetch(url);
    return resp.json();
}

const getWeatherFor = async ({locationQuery, geoLocation}: WeatherPropsType): Promise<any> => {
    if (!locationQuery && !geoLocation) {
        throw new Error('This function should be called containing at least one parameter.');
    }
    const searchUrl = getSearchUrl(locationQuery, geoLocation);
    const weather = await getNearestWOEID(searchUrl).then(woeid => getWeatherForWOEID(woeid));
    return weather;
}

export default {
    getWeatherFor,
}