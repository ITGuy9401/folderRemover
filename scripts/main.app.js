(function() {


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

	function configFn($routeProvider, $translateProvider) {
		$routeProvider.otherwise('/home');
		var resources = {};
		$translateProvider.useStaticFilesLoader({
			prefix: 'configuration/locale/locale_',
			suffix: '.json'
		});

		$translateProvider.registerAvailableLanguageKeys(['en', 'it'], {
			'en_US': 'en',
			'en_UK': 'en',
			'it_IT': 'it',
			'it_CH': 'it'
		});

		$translateProvider.preferredLanguage('it');
	}

	function runFn($rootScope) {

	}
})();