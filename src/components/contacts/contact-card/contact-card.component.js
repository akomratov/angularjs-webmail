import template from './contact-card.html';
import controller from './contact-card.controller';

let component = {
    bindings: {
        contact: '<',
        contactId: '<'
    },
    template,
    controller
};

export default component;