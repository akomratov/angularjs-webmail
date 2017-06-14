
export default class MailEntryController {

    static $inject = ['$log'];

    constructor ($log) {
        this._$log = $log;
    }

    removeLetter = () => {
        this._$log.info('Removing letter with title', this.letter.title);
        this.remove(this.letter);
    };

    $onInit = function() {
        this.letter.displaytime = new Date();
    };

    $onDestroy = function() {
        this._$log.info('Letter\'s display time is', (new Date() - this.letter.displaytime) / 1000, 'seconds');
    };

    getDisplayDate = () => {
        var now = new Date();
        var timestamp = this.letter.timestamp;
        var strDate = timestamp.toLocaleDateString();
        if( (now - timestamp) / 1000 < 86400 && now.getDate() === timestamp.getDate()) {
            strDate = 'сегодня'
        }
        return strDate + ', ' + this.letter.timestamp.toLocaleTimeString();
    };
}