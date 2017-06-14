import appRootTemplate from './app-root.tpl.html';

import mailbox from './components/mailbox/mailbox';
import contacts from './components/contacts/contacts';
import login from './components/login/login';

import MailSrv from './services/mail-service';
import UserSrv from './services/user-service';

let app = angular.module('myApp', ['ui.router', mailbox, contacts, login]);


app.service('MailService', MailSrv);
app.service('UserService', UserSrv);


app.config(($stateProvider, $urlRouterProvider) => {

    $stateProvider.state({
        name: 'mailbox',
        url: '/',
        template: '<mailbox></mailbox>'
    });

    $stateProvider.state({
        name: 'contacts',
        url: '/contacts',
        template: '<contacts></contacts>'
    });

    $stateProvider.state({
        name: 'contact',
        url: '/contacts/:contactId',
        template: '<contact-card contact-id="$ctrl.contactId" contact="$ctrl.contact"></contact-card>',
        controller: function($stateParams, UserService, $log) {
            this.contactId = $stateParams.contactId;
            this.contact = UserService.getUserById(this.contactId);
        },
        controllerAs: '$ctrl'
    });

    $stateProvider.state({
        name: 'login',
        url: '/login',
        template: '<login></login>'
    });

    $urlRouterProvider.otherwise("/");
});


app.component('appRoot', {
    template: appRootTemplate,
    controller: ['$log', '$timeout', 'MailService', 'UserService', function($log, $timeout, MailService, UserService) {
        this.MailBox = MailService;
        this.UserService = UserService;
    }]
});

/*
app.component('login', {
    bindings: {
    },
    templateUrl: './login.tpl.html',
    controller: function($log) {
        this.login = 'username';
        this.password = 'password'

        this.$onInit = () => {
            //$log.info('Currency converter $onInit()');
        };

        this.onLogin = () => {
            $log.info('Login button was pressed', this.login, this.password);
        };
    }
});

*/
