type IPInfoResponseType = {
    IPv4: string,
    city: string,
    country_code: string,
    country_name: string,
    latitude: number,
    longitude: number,
    postal: string,
    state: string,
};

const getIPInfo = async (): Promise<IPInfoResponseType> => {
    return await fetch('https://geolocation-db.com/json/').then(r => r.json());
};

export {
    getIPInfo,
};