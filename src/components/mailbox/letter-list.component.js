import template from './letter-list.html';
import controller from './letter-list.controller';


var module = angular.module('mailbox', [])
    .component('mailbox', {
        restrict: 'E',
        bindings: {},
        template,
        controller
    });

export default module;


