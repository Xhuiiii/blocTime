//Start of the program
// Load of the router
(function(){
    function config($stateProvider, $locationProvider){
        $locationProvider
            .html5Mode({
                // Used to disable hashbang(#!) in url
                enabled: true,
                requireBase: false //Required to make ui-router work
            });
        
        $stateProvider
            .state('home', {
                url: '/',
                controller: 'HomeCtrl as home',
                templateUrl: '/templates/home.html'
            });
    };
    
    angular
        .module('blocTime', ['ui.router', 'firebase'])
        .config(config);
})();