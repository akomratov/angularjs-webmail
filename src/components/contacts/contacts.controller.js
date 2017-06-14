export default class ContactsController {

    static $inject = ['$log', 'UserService'];

    constructor($log, UserService) {
        this.contacts = UserService.users;
    }

}
