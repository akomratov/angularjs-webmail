
import HomeComponent from './home.component';

let homeModule = angular.module('home', [])
    .component('home', HomeComponent)
    .name;

export default homeModule;