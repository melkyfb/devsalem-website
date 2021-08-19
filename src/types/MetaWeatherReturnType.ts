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

export type MetaWeatherReturnType = {
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