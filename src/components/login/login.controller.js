import { STATE_DEFAULT } from '../../constants';

export default class LoginController {

    static $inject = ['$log', '$state', 'AuthService'];

    constructor ($log, $state, AuthService) {
        this._$log = $log;
        this._authService = AuthService;
        this._$state = $state;

        this.user = 'a.komratov@yandex.ru';
        this.password = 'komratov';
    }

    login = (user, password) => {
        this._$log.info('Login button was pressed', user, password);
        this._authService.login(user, password)
            .then(resp => this.handleResponse(resp),
                  resp => this.handleResponse(resp));
    };

    handleResponse = (resp) => {
        this._authService.processLoginResponse(resp);
        if (this._authService.isAuthorized()) {
            this._$state.go(STATE_DEFAULT);
        }
    }
}