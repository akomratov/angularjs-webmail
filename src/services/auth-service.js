export default class AuthService {

    static $inject = ['$log', '$http', 'SessionService'];

    constructor($log, $http, SessionService) {
        this._$log = $log;
        this._$http = $http;
        this._SessionService = SessionService;
    }

    login = (user, password) => {
        return this._$http.post('http://random.vkhs.ru/api/v1/mailbox/login', { email: user, password: password});
    }

    logout = () => {
        this._SessionService.expireSession();
    }

    processLoginResponse = (resp) => {
        if(resp.status === 200) {
            this._SessionService.setAuthToken(resp.data.token);
        } else {
            this._$log.error('Login failed during HTTP POST with code ', resp.status, resp.statusText);
        }
    }

    isAuthorized = () => {
        return this._SessionService.sessionExists();
    }
}


