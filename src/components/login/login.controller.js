export default class LoginController {

    static $inject = ['$log', 'AuthService'];

    constructor ($log, AuthService) {
        this._$log = $log;
        this._authService = AuthService;

        this.login = 'a.komratov@yandex.ru';
        this.password = 'komratov';
    }

    onLogin = () => {
        this._$log.info('Login button was pressed', this.login, this.password);
        this._authService.login(this.login, this.password)
            .then(resp => this.handleResponse(resp),
                  resp => this.handleResponse(resp));
    };

    handleResponse = (resp) => {
        this._authService.processLoginResponse(resp);
        if(this._authService.isAuthorized()) {
            this._$log.info('Authorization is successfull');
        } else {
            this._$log.error('Authorization failed!')
        }
    }
}