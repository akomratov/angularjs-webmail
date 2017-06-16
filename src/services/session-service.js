import { REST_SERVICE_URL } from '../constants';

export default class SessionService {

    static $inject = ['$log'];

    constructor($log) {
        this._$log = $log;
        this.token = undefined;
    }

    setAuthToken = (token) => {
        this.token = token;
    }

    expireSession = () => {
        this.token = undefined;
    }

    sessionExists = () => {
        if(this.token) {
            return true;
        }
        return false;
    }

    request = (config) => {
        if(this.sessionExists()) {
            if(config.url.startsWith(REST_SERVICE_URL)) {
                config.headers['Authorization'] = 'Bearer ' + this.token;
            }
        }
        return config;
    }
}


