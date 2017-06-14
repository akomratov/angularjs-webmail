
export default class ContactCardController {

    static $inject = ['$log'];

    constructor($log) {
        this._$log = $log;
        this.state = '';
        this.contactId = undefined;
    }

    selectContact = () => {
        this._$log.info('Contact Id', this);
        this.state = this.state === 'selected' ? '' : 'selected';
    }

    isSelected = () => {
        return this.state;
    }
}

