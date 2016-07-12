angular.module('QuestionFactoryDemo.controllers',['ngCordova'])

  .controller('SaveCtrl', function($scope, $cordovaFile) {

    $scope.saveFile = function() {
      var idNumber = $scope.studyID
      var testID = 'test2'

      document.addEventListener('deviceready', function () {
        $cordovaFile.createDir(cordova.file.externalRootDirectory, 'StudyID/'+idNumber, false)
          .then(function(dir) {
              console.log(dir, 'successfully created');
              $cordovaFile.writeFile(cordova.file.externalRootDirectory+'/StudyID/'+idNumber,idNumber+testID+'.txt', "["+(new Date())+"]\n",false)
                .then(function(success) {console.log(success,'written in new dir')}, function(eWriteFile) {console.log(eWriteFile,'error writing file in new dir')})},
            function(eCreateDir) {console.log(eCreateDir, 'directory may already exist');
              $cordovaFile.writeFile(cordova.file.externalRootDirectory+'/StudyID/'+idNumber, idNumber+testID+'.txt', "["+(new Date())+"]\n", false)
                .then(function(file) {console.log(file, 'successfully written')},
                  function(eWriteFile) {console.log(eWriteFile, 'error creating file');
                    $cordovaFile.writeExistingFile(cordova.file.externalRootDirectory+'/StudyID/'+idNumber, idNumber+testID+'.txt', "["+(new Date())+"]\n")
                      .then(function(existingFile) {console.log(existingFile, 'updated')},
                        function(eExistingFile){console.log(eExistingFile,'error writing to existing file')});
                  });
            });
      });
    };
  });
