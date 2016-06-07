(function() {

    const defDirectory = require('electron').remote.app.getPath('desktop');
    const fs = require('fs'); // Node.js file system api

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
                var result = fs.accessSync(parentFolder, fs.R_OK | fs.W_OK);
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
    }
})();