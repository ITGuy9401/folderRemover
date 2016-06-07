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
            fs.accessSync(parentFolder, fs.R_OK | fs.W_OK, (err) => {
                if (err) {
                    rwEnabledMain = false;
                    var alert = $mdDialog.alert({
                        
                    });
                    $mdDialog.show(alert);
                }
            });
        }
    }
})();