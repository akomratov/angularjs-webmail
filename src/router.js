import { STATE_HOME, STATE_HOME_MAIL, STATE_HOME_CONTACTS, STATE_HOME_SINGLE_CONTACT, STATE_LOGIN, STATE_DEFAULT,
         URL_HOME, URL_HOME_CONTACTS, URL_HOME_SINGLE_CONTACT, URL_HOME_MAIL, URL_LOGIN } from './constants';

let routerModule = angular.module('myApp.Router', [
    'ui.router'])

    .config(($stateProvider, $urlRouterProvider, $qProvider) => {

        "ngInject";

        $qProvider.errorOnUnhandledRejections(false);

        $stateProvider.state({
            name: STATE_HOME,
            url: URL_HOME,
            abstract: true,
            template: '<home><ui-view></ui-view></home>'
        });

        $stateProvider.state({
            name: STATE_HOME_MAIL,
            url: URL_HOME_MAIL,
            template: '<mailbox></mailbox>'
        });

        $stateProvider.state({
            name: STATE_HOME_CONTACTS,
            url: URL_HOME_CONTACTS,
            template: '<contacts></contacts>'
        });

        $stateProvider.state({
            name: STATE_HOME_SINGLE_CONTACT,
            url: URL_HOME_SINGLE_CONTACT,
            template: '<contact-card contact-id="$ctrl.contactId" contact="$ctrl.contact"></contact-card>',
            controller: function ($stateParams, $injector, $log) {
                this.contactId = $stateParams.contactId;
                this.contact = $injector.get('UserService').getUserById(this.contactId);
            },
            controllerAs: '$ctrl'
        });

        $stateProvider.state({
            name: STATE_LOGIN,
            url: URL_LOGIN,
            template: '<login></login>'
        });

        $urlRouterProvider.$inject = ['$injector'];
        $urlRouterProvider.otherwise(($injector) => {
            let authSrv = $injector.get('AuthService');
            if (!authSrv.isAuthorized()) {
                return $injector.get('$state').go(STATE_LOGIN);;
            }
            return $injector.get('$state').go(STATE_DEFAULT);
        });
    });


routerModule.run(($transitions, $q, $log, AuthService) => {
    $transitions.onEnter({to: 'home.**'}, ($state$, $transitions$) => {
        if (!AuthService.isAuthorized()) {
            return $state$.router.stateService.target(STATE_LOGIN);
        }
    });
});



export default routerModule.name;
