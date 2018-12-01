(function () {

    'use strict';

    angular
        .module(QuizUp)
        .factory('$authenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', '$api', '$q'];

    function AuthenticationService($http, $cookies, $rootScope, $api, $q) {

        return {
            Login: login,
            SetCredentials: setCredentials,
            ClearCredentials: clearCredentials,
            IsLoggedIn: isLoggedIn,
            GetToken: getToken
        };

        function getToken() {

            let user = $rootScope.currentUser;

            if (user !== null) {
                return user.token;
            } else {
                return '';
            }
        }

        function isLoggedIn() {
            let token = $cookies.get('_authentication');
            if (token) {
                $rootScope.currentUser = {
                    token: token
                };
                return true;
            } else {
                return false;
            }
        }

        function login(user) {

            return $http.post($api.base + $api.account.login, user)
                .then(function (response) {
                    setCredentials(response.data.token);
                    return response.data;
                }, function (error) {
                    return error;
                });
        }

        function setCredentials(authenticationToken) {

            $rootScope.currentUser = {
                token: authenticationToken
            };

            $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.currentUser.token;
            const cookieExpiryDate = new Date();
            cookieExpiryDate.setDate(cookieExpiryDate.getDate() + 7);
            $cookies.put('_authentication', $rootScope.currentUser.token, {expires: cookieExpiryDate});
        }

        function clearCredentials() {
            $rootScope.currentUser = null;
            $cookies.remove('_authentication');
            $http.defaults.headers.common.Authorization = '';
        }
    }

})();