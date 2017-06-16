import appRootTemplate from './app-root.tpl.html';

import mailbox from './components/mailbox/mailbox';
import contacts from './components/contacts/contacts';
import login from './components/login/login';
import router from './router';


import MailSrv from './services/mail-service';
import UserSrv from './services/user-service';
import AuthSrv from './services/auth-service';


let app = angular.module('myApp', [mailbox, contacts, login, router]);

app.service('MailService', MailSrv);
app.service('UserService', UserSrv);
app.service('AuthService', AuthSrv);


// WANTED TO DO THIS WAY
// import Router from './router';
// app.config(Router);


/*
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

*/

app.component('appRoot', {
    template: appRootTemplate,
    controller: ['$log', '$timeout', 'MailService', 'UserService', function($log, $timeout, MailService, UserService) {
        this.MailBox = MailService;
        this.UserService = UserService;
    }]
});

