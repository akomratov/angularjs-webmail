import template from './avatar.html';
import controller from './avatar.controller';

let component = {
    bindings: {
        image: '<'
    },
    template,
    controller
};

export default component;