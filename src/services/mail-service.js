export default class MailService {

    static $inject = ['$log', '$timeout', '$http', 'AuthService'];

    constructor($log, $timeout, $http, AuthService) {
        this._$log = $log;
        this._$timeout = $timeout;
        this._$http = $http;
        this._authService = AuthService;

        this.letters = [];
        $timeout(() => { this.startMailService() }, 2000);
    }

    addLetter = (letter) => {
        letter.timestamp = new Date();
        this.letters.push(letter);
    };

    removeLetter = (letter) => {
        this._$log.info('Letter\'s life time is', (new Date() - letter.timestamp) / 1000, 'seconds');
        this.letters.splice(this.letters.indexOf(letter), 1);
    };

    generateLetter = () => {

        this._$timeout( () => {
            if(this.letters.length < 20) {
                this._$log.info('New fake letter is comming');
                this.addLetter(
                    {
                        body: 'Empty body',
                        email: 'test@gmail.com',
                        name: 'Test service',
                        title: 'No subject',
                        picture: 'no picture',
                        time: 'no time',
                    }
                );
            }
            this.generateLetter();
        }, (Math.random()*5+3)*1000);
    };

    addFakeLetters = () => {
        this.addLetter(
            {
                body: 'body',
                email: 'alert@mail.ru',
                name: 'Alert service',
                title: 'Notification',
                picture: 'no picture',
                time: 'no time',
            }
        );
        this.addLetter(
            {
                body: 'Your confirmation required',
                email: 'subscribe@mail.ru',
                name: 'Subscribe service',
                title: 'Confirmation required',
                picture: 'no picture',
                time: 'no time',
            }
        );
    };

    startMailService = () => {
        // LOCAL fake mails
        //this.addFakeLetters();
        //this.generateLetter();

        // REMOTE HTTP service
        this.getLettersByHTTP(3); // initially GET 3 letters from remote mailbox
        this.getRandomLetterByHTTP();
    };

    getInbound = (id) => {

        let url = 'http://random.vkhs.ru/api/v1/mailbox/inbox';
        url = id ? url + '/' + id : url;

        this._$log.info('MailService.getInbound()', {name: 'Alice'} );

        return this._$http({method: 'GET', url: url, headers: { ...this._authService.getAuthTokenForHeader() }});
    };

    processInboundResponse = (resp) => {
        if(resp.status === 200) {
            return resp.data;
        }

        this._$log.error('Reading Inbound failed during HTTP GET with code ', resp.status, resp.statusText);
        return null;
    };

    getLettersByHTTP = (num) => {
        this._$http.get('http://random.vkhs.ru/letters/' + num).then(
            (successResponse) => {
                successResponse.data.forEach(
                    (item) => {
                        this.addLetter(item);
                    }
                );
            },
            (errorResponse) => {
                this._$log.info('Error occurred during HTTP GET request', errorResponse);
            }
        );

    };

    getRandomLetterByHTTP = () => {

        this._$timeout( () => {
            if(this.letters.length < 20) {
                this._$log.info('Receiving new letter by HTTP GET');
                this.getLettersByHTTP(1);
            }
            this.getRandomLetterByHTTP();
        }, (Math.random()*5+3)*1000);
    };
}


