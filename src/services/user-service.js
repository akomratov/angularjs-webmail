export default class UserService {

    static $inject = ['$log', '$http'];

    constructor($log, $http) {
        this._$log = $log;
        this._$http = $http;
        this.users = [];

        this.getUserList();
    }

    getUserListByHTTP = () => {
        this._$http.get('https://learn.javascript.ru/courses/groups/api/participants?key=uczue3')
            .then((successResponse) => {
                    successResponse.data.forEach((item) => {
                        this.users.push(item);
                    });
                },
                (errorResponse) => {
                    this._$log.info('Error occurred during HTTP GET request', errorResponse);
                }
            );
    };

    getUserList = () => {
        //this.getTestUserList();
        this.getUserListByHTTP();
    };

    getUserById = (id) => {
        if(id >= 0) {
            return this.users[id];
        }

        return null;
    };

    getTestUserList = () => {

        var testUsers = [
            {
                firstName: 'First Name',
                surname: 'Surname',
                photo: '',
                country: 'ru',
                name: 'Ivan Smirnov',
                address: 'pl.Mira, 5',
                sex: 'male',
                born: '1980-12-01',
                email: 'ivan.smirnov@gmail.com',
                avatar: 'https://randomuser.me/api/portraits/med/men/83.jpg'
            },
            {
                firstName: 'First Name',
                surname: 'Surname',
                photo: '',
                country: 'ru',
                name:'Piotr Kruglov',
                address: 'Karlsplatz, 2',
                sex: 'male',
                born: '1985-10-20',
                email: 'piotr.kruglov@gmail.com'
            }];

        testUsers.forEach((item) => {
            this.users.push(item);
        });

    };
};


//UserService.$inject = ['$log', '$http'];
