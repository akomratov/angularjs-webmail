import appRootTemplate from './app-root.tpl.html';

import mailbox from './components/mailbox/mailbox';
import contacts from './components/contacts/contacts';
import login from './components/login/login';
import router from './router';
import home from './components/home';

import MailSrv from './services/mail-service';
import UserSrv from './services/user-service';
import AuthSrv from './services/auth-service';
import SessionSrv from './services/session-service';

let app = angular.module('myApp', [mailbox, contacts, login, router, home]);

app.service('MailService', MailSrv);
app.service('UserService', UserSrv);
app.service('AuthService', AuthSrv);
app.service('SessionService', SessionSrv);


app.component('appRoot', {
    template: appRootTemplate
});


app.config(($httpProvider) => {
    $httpProvider.interceptors.push('SessionService');
});


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
