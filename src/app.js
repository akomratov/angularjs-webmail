import appRootTemplate from './app-root.tpl.html';
//import letterListTemplate from './components/mailbox/letter-list.html';
//import letterTemplate from './letter.tpl.html';

import mailbox from './components/mailbox/mailbox';

import MailSrv from './services/mail-service';
import UserSrv from './services/user-service';

let app = angular.module('myApp', ['ui.router', mailbox]);


app.service('MailService', MailSrv);
app.service('UserService', UserSrv);


app.config(($stateProvider, $urlRouterProvider) => {

    $stateProvider.state({
        name: 'mailbox',
        url: '/',
        template: '<mailbox></mailbox>'
    });

    $stateProvider.state({
        name: 'user-list',
        url: '/user',
        template: '<user-list></user-list>'
    });

    $stateProvider.state({
        name: 'user',
        url: '/user/:userId',
        template: '<user-card user-id="$ctrl.userId" user="$ctrl.user"></user-card>',
        controller: function($stateParams, UserService, $log) {
            this.userId = $stateParams.userId;
            this.user = UserService.getUserById(this.userId);
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

//app.component('letterList', letterListComponent);

/*

app.component('letterList', {
    bindings: {
    },
    template: letterListTemplate,
    controller: function($log, $timeout, MailService) {

        this.letters = MailService.letters;

        this.removeLetter = (letter) => {
            MailService.removeLetter(letter);
        };

        this.shouldDisplayLetter = (letterIndex) => {

            if(letterIndex < 15) {
                return true;
            }
            return false;
        };
    }
});

app.component('letter', {
    bindings: {
        letter: '<',
        remove: '&'
    },
    template: letterTemplate,
    controller: function($log) {
        this.removeLetter = () => {
            $log.info('Removing letter with title', this.letter.title);
            this.remove(this.letter);
        };
        this.$onInit = function() {
            //$log.info('$onInit', this.letter);
            this.letter.displaytime = new Date();
        };
        this.$onDestroy = function() {
            $log.info('Letter\'s display time is', (new Date() - this.letter.displaytime) / 1000, 'seconds');
        };

        this.getDisplayDate = () => {
            var now = new Date();
            var timestamp = this.letter.timestamp;
            var strDate = timestamp.toLocaleDateString();
            if( (now - timestamp) / 1000 < 86400 && now.getDate() === timestamp.getDate()) {
                strDate = 'сегодня'
            }
            return strDate + ', ' + this.letter.timestamp.toLocaleTimeString(); //getDate() + '.' + this.letter.timestamp.getMonth()+1 + '.' + this;
        };
    }
});

*/

app.component('userList', {
    bindings: {
        mode: '<'
    },
    templateUrl: './user-list.tpl.html',
    controller: function($log, UserService) {

        this.onlyWithPhoto = false;
        this.users = UserService.users;

        this.shouldShowUser = (user) => {
            if(this.onlyWithPhoto && !user.photo) {
                return false;
            }
            return true;
        };

    }
});

app.component('userCard', {
    bindings: {
        user: '<user',
        userId: '<',
        photoNeeded: '<photoNeeded'
    },
    templateUrl: './user-card.tpl.html',
    controller: function($log) {
        this.state = '';

        this.$onInit = () => {
            //$log.info('User Id', this.userId);
        },

            this.selectCard = () => {
                $log.info('onlyWithPhoto=' + this.photoNeeded);
                $log.info('User Id', this.userId);

                this.state = this.state === 'selected' ? '' : 'selected';
            };
        this.getSelected = () => {
            return this.state;
        };
        this.isVisible = () => {

            //$log.info('photoNeeded:', this.photoNeeded, 'Avatar:', this.user.photo);
            if(this.photoNeeded && !this.user.photo) {
                return false;
            }
            return true;
        };
    }
});

app.component('avatar', {
    bindings: {
        image: '<image'
    },
    templateUrl: './avatar.tpl.html',
    controller: function($log) {
        this.say = () => {
            $log.info('hey!');
        };
    }
});

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


