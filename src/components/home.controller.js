export default class HomeController {

    static $inject = ['$log', '$state', 'MailService', 'UserService', 'AuthService'];

    constructor($log, $state, MailService, UserService, AuthService) {
        this._$log = $log;
        this._$state = $state;
        this._MailBox = MailService;
        this._UserService = UserService;
        this._AuthService = AuthService;

        this.logout = () => {
            this._AuthService.logout();
        }
    }
}