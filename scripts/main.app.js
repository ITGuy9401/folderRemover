(function () {

    angular.module('folder-remover', [
        'ngRoute',
        'ngSanitize',
        'ngAnimate',
        'ngAria',
        'ngMessages',
        'ngMaterial',
        'pascalprecht.translate'
    ])
    .config(configFn).run(runFn);

    function configFn($routeProvider) {
        $routeProvider.otherwise('/home');
    }
    function runFn($rootScope) {
    }
})();