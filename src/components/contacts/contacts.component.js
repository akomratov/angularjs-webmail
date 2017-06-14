import template from './contacts.html';
import controller from './contacts.controller';

let component = {
    bindings: {
        mode: '<'
    },
    template,
    controller
};

export default component;
