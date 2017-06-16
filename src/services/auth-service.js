export default class AuthService {

    static $inject = ['$log', '$http'];

    constructor($log, $http) {
        this._$log = $log;
        this._$http = $http;

        this.token = undefined;
    }

    login = (user, password) => {
        return this._$http.post('http://random.vkhs.ru/api/v1/mailbox/login', { email: user, password: password});
    }

    logout = () => {
        this.expireSession();
    }


    processLoginResponse = (resp) => {
        if(resp.status === 200) {
            this.token = resp.data.token;
        } else {
            this._$log.error('Login failed during HTTP POST with code ', resp.status, resp.statusText);
        }
    }

    isAuthorized = () => {
        if(this.token) {
            return true;
        }
        return false;
    }

    expireSession = () => {
        this.token = undefined;
    }

    getAuthToken = () => {
        return this.token;
    }

    getAuthTokenForHeader = () => {
        return { 'Authorization': 'Bearer ' + this.getAuthToken() };
    }
}


