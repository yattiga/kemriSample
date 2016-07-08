angular.module('QuestionsFactoryDemo', ['ionic', 'ionic-datepicker'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .factory('Questions', function ($http) {
    var Questions = {

    SOCIO_EMOTIONAL: '/android_asset/www/data/socio-emotional.txt',
      getQuestions: function (questionUrl) {
        var questions = [];


        $http.get(questionUrl).success(function (result) {
          var questionStrs = result.split("\n");
        for (i = 0; i < questionStrs.length; i++) {
          if (questionStrs[i]) {
            var parts = questionStrs[i].split('|');
            questions.push({
              name: parts[0],
              question: parts[1],
              type: parts[2]
            });
          }
        }
        });

        return questions;
      }
    };

    return Questions;
  })



  .controller("QuestionCtrl", function ($scope, Questions, ionicDatePicker) {
    $scope.questions = Questions.getQuestions(Questions.SOCIO_EMOTIONAL);
    $scope.pickedDate = new Date();

    $scope.openDatePicker = function () {
      var datePickerOptions = {
        callback: function (val) {
          $scope.pickedDate = new Date(val);
        },
        inputDate: $scope.pickedDate,
        closeOnSelect: false,
        templateType: 'popup',
        from: new Date(1990, 1, 1)
      };
      ionicDatePicker.openDatePicker(datePickerOptions);
    };
  });
