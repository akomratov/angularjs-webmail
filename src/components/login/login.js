
import LoginComponent from './login.component';

let loginModule = angular.module('login', [])
    .component('login', LoginComponent)
    .name;

export default loginModule;