export default class LoginController {

    static $inject = ['$log'];

    constructor ($log) {
        this._$log = $log;
        this.login = 'username';
        this.password = 'password';
    }

    onLogin = () => {
        this._$log.info('Login button was pressed', this.login, this.password);
    };
}