let routerModule = angular.module('myApp.Router', [
    'ui.router'])

    .config(($stateProvider, $urlRouterProvider) => {

        "ngInject";
        $stateProvider.state({
            name: 'mailbox',
            url: '/mail',
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
            controller: function ($stateParams, UserService, $log) {
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

        $urlRouterProvider.otherwise("/login");
    })

    .name;

export default routerModule;

// WANTED TO DO THIS WAY
/*
export default class Router {
    constructor($stateProvider, $urlRouterProvider) {

        this._$state = $stateProvider;
        this._$url = $urlRouterProvider;

        this._$state.state({
            name: 'mailbox',
            url: '/mail',
            template: '<mailbox></mailbox>'
        });

        this._$state.state({
            name: 'contacts',
            url: '/contacts',
            template: '<contacts></contacts>'
        });

        this._$state.state({
            name: 'contact',
            url: '/contacts/:contactId',
            template: '<contact-card contact-id="$ctrl.contactId" contact="$ctrl.contact"></contact-card>',
            controller: function ($stateParams, UserService, $log) {
                this.contactId = $stateParams.contactId;
                this.contact = UserService.getUserById(this.contactId);
            },
            controllerAs: '$ctrl'
        });

        this._$state.state({
            name: 'login',
            url: '/login',
            template: '<login></login>'
        });

        this._$url.otherwise("/login");

    }
}
*/