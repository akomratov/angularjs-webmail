export default class LetterListController {

    static $inject = ['$log', '$timeout', 'MailService'];

    constructor($log, $timeout, MailService) {

        this.letters = MailService.letters;

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
};
