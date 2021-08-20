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

export default class MetaWeatherClient {   
    MetaWeatherAPIURL = 'https://www.metaweather.com/api/';
    MetaWeatherAPIURLLocation = `${this.MetaWeatherAPIURL}location/`;
    MetaWeatherAPIURLLocationSearch = `${this.MetaWeatherAPIURLLocation}search/`; 

    getSearchUrl = (locationQuery?: string, geoLocation?: [number, number]): string => {
        if (!locationQuery && !geoLocation) {
            throw new Error('This function should be called containing at least one parameter.');
        }
    
        let url = locationQuery
            ? `${this.MetaWeatherAPIURLLocationSearch}?query=${locationQuery}`
            : `${this.MetaWeatherAPIURLLocationSearch}?lattlong=${geoLocation?.join(',')}`;

        return url;
    }

    getNearestWOEID = async (url: string): Promise<number> => {
        const response: LocationSearchResponseType[] = await fetch(url).then(r => r.json());
        return response.length > 0 ? response[0].woeid : -1;
    }

    getWeatherForWOEID = async (woeid: number): Promise<MetaWeatherReturnType> => {
        const url = `${this.MetaWeatherAPIURLLocation}${woeid}`;
        return await fetch(url).then(r => r.json());
    }

    getWeatherFor = ({locationQuery, geoLocation}: WeatherPropsType): Promise<MetaWeatherReturnType> => {
        if (!locationQuery && !geoLocation) {
            throw new Error('This function should be called containing at least one parameter.');
        }
        const searchUrl = this.getSearchUrl(locationQuery, geoLocation);
        return this.getNearestWOEID(searchUrl).then(nearestWOEID => this.getWeatherForWOEID(nearestWOEID));
    }
}