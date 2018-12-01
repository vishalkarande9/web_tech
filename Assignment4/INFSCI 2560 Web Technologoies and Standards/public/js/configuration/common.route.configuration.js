(function () {

    angular.module(QuizUp).config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {

        const homeState = {
            name: 'Home',
            url: '/',
            template: '<h1>Hello</h1>',
            isAuthenticationRequired : false,
        };

        const accountLoginState = {
            name: 'Login',
            url: 'account/login',
            templateUrl: 'pages/account/login.html',
            isAuthenticationRequired : false,
            controller: 'LoginController'
        };

        const accountRegistrationState = {
            name: 'Registration',
            url: 'account/register',
            templateUrl: 'pages/account/register.html',
            isAuthenticationRequired : false,
            controller: 'RegistrationController as vm'
        };

        const accountProfile = {
            name: 'Profile',
            url: 'account/profile',
            templateUrl: 'pages/account/profile.html',
            isAuthenticationRequired: true,
            controller: 'ProfileController'
        };
        //Prathamesh added
        const CoursesAdmin = {
            name: 'Courses',
            url: 'account/courses',
            templateUrl: 'pages/Admin/Courses.html',
            //template: '<h3>Its the UI-Router hello world app!</h3>',
            //isAuthenticationRequired: false};
            controller: 'CoursesController as cc'};

        const SectionAdmin = {
            name: 'Sections',
            url: 'account/sections',
            templateUrl: 'pages/Admin/Sections.html',
            //template: '<h3>Its the UI-Router hello world app!</h3>'
            controller: 'SectionsController as sc'
        }
        const QuestionAdmin = {
            name: 'Questions',
            url: 'account/questions',
            templateUrl: 'pages/Admin/Questions.html',
            //template: '<h3>Its the UI-Router hello world app!</h3>'
            controller: 'QuestionsController as qc'
        }
            //isAuthenticationRequired: false};




        $stateProvider.state(homeState);

        $stateProvider.state(accountRegistrationState);

        $stateProvider.state(accountLoginState);

        $stateProvider.state(accountProfile);

        $stateProvider.state(CoursesAdmin);

        $stateProvider.state(SectionAdmin);

        $stateProvider.state(QuestionAdmin);


    }]);

})();