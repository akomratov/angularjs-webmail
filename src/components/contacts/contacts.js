
import ContactsComponent from './contacts.component';
import ContactCardComponent from './contact-card/contact-card.component';
import AvatarComponent from './avatar/avatar.component';

let contactsModule = angular.module('Contacts', [])
    .component('contacts', ContactsComponent)
    .component('contactCard', ContactCardComponent)
    .component('avatar', AvatarComponent)
    .name;

export default contactsModule;
