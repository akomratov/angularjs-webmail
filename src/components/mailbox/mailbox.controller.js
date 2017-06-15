export default class MailboxController {

    static $inject = ['$log', '$timeout', 'MailService'];

    constructor($log, $timeout, MailService) {

        this._$log = $log;
        this._mailService = MailService;

        this.letters = this._mailService.letters;

        this._mailService.getInbound()
            .then(resp => this.handleInboundResponse(resp),
                  resp => this.handleInboundResponse(resp));

        this.removeLetter = (letter) => {
            MailService.removeLetter(letter);
        };

        this.shouldDisplayLetter = (letterIndex) => {

            if(letterIndex < 15) {
                return true;
            }
            return false;
        };
    }

    handleInboundResponse = (resp) => {
        let data = this._mailService.processInboundResponse(resp);
        this._$log.info('Inbound response', data);
    }
};
