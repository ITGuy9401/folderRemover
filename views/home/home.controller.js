(function() {

	const defDirectory = require('electron').remote.app.getPath('desktop');
	const fs = require('fs'); // Node.js file system API
	const path = require('path'); // Node.js file system API for path browsing 

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
		vm.log = "";
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
			internalRoutineDeleteFromFolder(vm.form.parentFolder, vm.form.folderName)
		}

		function internalRoutineDeleteFromFolder(parentFolder, folderNameToDelete) {
			var rwEnabledMain = true;
			try {
				fs.accessSync(parentFolder, fs.R_OK | fs.W_OK);
				var directories = getDirectories(parentFolder);

				idToRemove = null;

				for (var i = 0; i < directories.length; i++) {
					if (directories[i].toUpperCase() === folderNameToDelete.toUpperCase()) {
						idToRemove = i;
					} else {
						internalRoutineDeleteFromFolder(path.resolve(parentFolder + '/' + directories[i]), folderNameToDelete);
					}
				}

				var pathToDelete = path.resolve(parentFolder + '/' + folderNameToDelete);

				try {
					if (idToRemove) {

						var deletedMessage = $translate.instant('message.FolderRemover.deletedFolder', {
							arg0: pathToDelete
						});
						console.log(deletedMessage);
					}
				} catch (err) {
					var alert = $mdDialog.alert({
					title: $translate.instant('title.userSupport'),
					textContent: $translate.instant('error.FolderRemover.cannotRemoveFolder', {
						arg0: pathToDelete,
						arg1: err
					}),
					ok: $translate.instant('button.close')
				});
				$mdDialog.show(alert);
				}

			} catch (err) {
				rwEnabledMain = false;
				var alert = $mdDialog.alert({
					title: $translate.instant('title.userSupport'),
					textContent: $translate.instant('error.FolderRemover.cannotOpenFolder', {
						arg0: parentFolder,
						arg1: err
					}),
					ok: $translate.instant('button.close')
				});
				$mdDialog.show(alert);
			}
		}

		function getDirectories(srcpath) {
			return fs.readdirSync(srcpath).filter(function(file) {
				return fs.statSync(path.resolve(srcpath, file)).isDirectory();
			});
		}

		function loggerLog(message) {
			vm.log = vm.log + "<br/>" + loggerDecode(message, '', 'blue');
		}

		function loggerErr(message) {
			vm.log = vm.log + "<br/>" + loggerDecode(message, '', 'red');
		}

		function loggerWarn(message) {
			vm.log = vm.log + "<br/>" + loggerDecode(message, '', 'orange');
		}

		function loggerDecode(message, icon, color) {
			return '<span style="color: ' + color + '<span class="fa fa-' + icon + '"></span>' + message + "</span>";
		}
	}
})();