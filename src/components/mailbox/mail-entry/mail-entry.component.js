import template from './mail-entry.html';
import controller from './mail-entry.controller';

let component = {

    bindings: {
        letter: '<',
        remove: '&'
    },

    template,
    controller
};

export default component;

