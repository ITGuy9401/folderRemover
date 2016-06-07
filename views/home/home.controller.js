(function() {

	const defDirectory = require('electron').remote.app.getPath('desktop');
	const fs = require('fs'); // Node.js file system API
	const path = require('path'); // Node.js file system API for path browsing
	const rimraf = require('rimraf');

	angular.module('folder-remover')
		.config(configCurrentRouteFn)
		.controller('HomeController', homeControllerFn);

	function configCurrentRouteFn($routeProvider) {
		$routeProvider.when('/home', {
			templateUrl: 'views/home/home.html',
			controller: 'HomeController',
			controllerAs: 'vm'
		});
	}

	function homeControllerFn($scope, $rootScope, $translate, $mdDialog) {
		var vm = this;
		vm.form = {};
		vm.openFolder = openFolderFn;
		vm.execute = executeFn;
		vm.log = [$translate.instant('label.ready')];
		var logger = {
			log: loggerLog,
			err: loggerErr,
			warn: loggerWarn
		};

		function openFolderFn() {
			var currDirectory = (vm.form.parentFolder && vm.form.parentFolder.length > 0) ? vm.form.parentFolder : defDirectory;
			require('electron').remote.dialog.showOpenDialog({
				defaultPath: currDirectory,
				properties: ['openDirectory']
			}, openFolderThenFn);
		}

		function openFolderThenFn(filenames) {
			$scope.$evalAsync(function() {
				vm.form.parentFolder = filenames[0];
			});
		}

		function executeFn() {
			logger.log($translate.instant('message.FolderRemover.selectedFolder', {arg0: vm.form.parentFolder}));
			logger.log($translate.instant('message.FolderRemover.selectedFolderToDelete', {arg0: vm.form.folderName}))
			internalRoutineDeleteFromFolder(vm.form.parentFolder, vm.form.folderName)
		}

		function internalRoutineDeleteFromFolder(parentFolder, folderNameToDelete) {
			var rwEnabledMain = true;
			try {
				fs.accessSync(parentFolder, fs.R_OK | fs.W_OK);
				var directories = getDirectories(parentFolder);

				var hasFolder = false;

				for (var i = 0; i < directories.length; i++) {
					if (directories[i].toUpperCase() === folderNameToDelete.toUpperCase()) {
						hasFolder = true;
					} else {
						internalRoutineDeleteFromFolder(path.resolve(parentFolder + '/' + directories[i]), folderNameToDelete);
					}
				}

				var pathToDelete = path.resolve(parentFolder + '/' + folderNameToDelete);

				try {
					if (hasFolder) {
						rimraf(pathToDelete, {}, function (err) {
							throw err;
						});
						var deletedMessage = $translate.instant('message.FolderRemover.deletedFolder', {
							arg0: pathToDelete
						});
						logger.log(deletedMessage);
					}
				} catch (err) {
					var errorMessage = $translate.instant('error.FolderRemover.cannotRemoveFolder', {
						arg0: pathToDelete,
						arg1: err.message
					});
					logger.err(errorMessage);
					console.error(err);
				}

			} catch (err1) {
				rwEnabledMain = false;
				var errorMessage = translate.instant('error.FolderRemover.cannotOpenFolder', {
					arg0: parentFolder,
					arg1: err1.message
				});
				logger.warn(errorMessage);
				console.warn(err);
			}
		}

		function getDirectories(srcpath) {
			return fs.readdirSync(srcpath).filter(function(file) {
				return fs.statSync(path.resolve(srcpath, file)).isDirectory();
			});
		}

		function loggerLog(message) {
			vm.log.push(loggerDecode(message, 'info-circle', 'blue'));
			console.log(message);
		}

		function loggerErr(message) {
			vm.log.push(loggerDecode(message, 'exclamation-circle', 'red'));
			console.error(message);
		}

		function loggerWarn(message) {
			vm.log.push(loggerDecode(message, 'exclamation-triangle', 'orange'));
			console.warn(message);
		}

		function loggerDecode(message, icon, color) {
			return '<p style="color: ' + color + '<span class="fa fa-' + icon + '"></span>' + message + "</p>";
		}
	}
})();