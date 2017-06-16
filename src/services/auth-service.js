export default class AuthService {

    static $inject = ['$log', '$http', 'SessionService'];

    constructor($log, $http, SessionService) {
        this._$log = $log;
        this._$http = $http;
        this._SessionService = SessionService;

        this.token = undefined;
    }

    login = (user, password) => {
        return this._$http.post('http://random.vkhs.ru/api/v1/mailbox/login', { email: user, password: password});
    }

    logout = () => {
        //this.expireSession();
        this._SessionService.expireSession();
    }


    processLoginResponse = (resp) => {
        if(resp.status === 200) {
            this._SessionService.setAuthToken(resp.data.token);
            //this.token = resp.data.token;
        } else {
            this._$log.error('Login failed during HTTP POST with code ', resp.status, resp.statusText);
        }
    }

    isAuthorized = () => {
        /*
        if(this.token) {
            return true;
        }
        return false;
        */
        return this._SessionService.sessionExists();
    }
/*
    expireSession = () => {
        this.token = undefined;
    }

    getAuthToken = () => {
        return this.token;
    }

    getAuthTokenForHeader = () => {
        return { 'Authorization': 'Bearer ' + this.getAuthToken() };
    }
    */
}


