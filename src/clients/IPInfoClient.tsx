type IPInfoResponseType = {
    ip: string,
    hostname: string,
    city: string,
    region: string,
    country: string,
    loc: string,
    org: string,
    postal: string,
    timezone: string,
    readme: string
}

export default class IPInfoClient {
    IPInfoBaseURL = 'https://ipinfo.io/json=';
    getIPInfo = async (): Promise<IPInfoResponseType> => {
        return await fetch(this.IPInfoBaseURL).then(r => r.json());
    }
}