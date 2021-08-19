type SourceType = {
    title: string,
    url: string
}

type ParentType = {
    title: string,
    location_type: string,
    latt_long: [number, number],
    woeid: number
}

type LocationSearchResponseType = {    
    title: string,
    location_type: string,
    latt_long: [number, number],
    woeid: number,
    distance: number
}

type ConsolidatedWeatherType = {
    id: number,
    applicable_date: Date,
    weather_state_name: string,
    weather_state_abbr: string,
    wind_speed: number,
    wind_direction: number,
    wind_direction_compass: string,
    min_temp: number,
    max_temp: number,
    the_temp: number,
    air_pressure: number,
    humidity: number,
    visibility: number,
    predictability: number
}

type MetaWeatherReturnType = {
    title: string,
    location_type: string,
    latt_long: [number, number],
    time: Date,
    sun_rise: Date,
    sun_set: Date,
    timezone_name: string,
    woeid: number,
    consolidated_weather: ConsolidatedWeatherType[],
    parent: ParentType,
    sources: SourceType[]
}

type WeatherPropsType = {
    locationQuery?: string,
    geoLocation?: [number, number]
}

export default class MetaWeatherRequester {   
    MetaWeatherAPIURL = 'https://www.metaweather.com/api/';
    MetaWeatherAPIURLLocation = `${this.MetaWeatherAPIURL}location/`;
    MetaWeatherAPIURLLocationSearch = `${this.MetaWeatherAPIURLLocation}search/`; 

    getSearchUrl = (locationQuery?: string, geoLocation?: [number, number]): string => {
        if (!locationQuery && !geoLocation) {
            throw new Error('This function should be called containing at least one parameter.');
        }
    
        let url = locationQuery
            ? `${this.MetaWeatherAPIURLLocationSearch}?query=${locationQuery}`
            : `${this.MetaWeatherAPIURLLocationSearch}?lattlong=${geoLocation.join(',')}`;            

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