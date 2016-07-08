/*angular.module('QuestionsFactoryDemo', ['ionic', 'ionic-datepicker'])
 .factory('Questions', function ($http) {
 var Questions = {

 SOCIO_EMOTIONAL: '/data/socio-emotional.txt',
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
 type: parts[2],
 ans: ''
 });
 }
 }
 });

 return questions;
 }
 };*/

angular.module('QuestionsFactoryDemo', ['ionic', 'ionic-datepicker'])
    .factory('Questionservice', function ($http) {

        function Questionservice () {
            var self = this;
            self.questions = [];
            self.SOCIO_EMOTIONAL = '/data/socio-emotional.txt';

            self.getQuestions =function () {
                $http.get(self.SOCIO_EMOTIONAL).success(function (result) {
                    var questionStrs = result.split("\n");

                    for (count = 0; count < questionStrs.length; count++) {
                        if (questionStrs[count]) {

                            var parts = questionStrs[count].split('|');
                            self.questions.push({
                                name: parts[0],
                                question: parts[1],
                                type: parts[2],
                                ans: '',
                                i: count
                            });
                            console.log('came here in get',self.questions[count],self.questions.length)
                        }
                    }

                });

                return self.questions;
            };
            self.setanswers = function (qarray){
                for (index = 0; index < qarray.length; index++ ){
                    self.questions[index].ans = qarray[index].ans;
                    console.log (index +' value ' + self.questions[index].ans);
                    console.log (index +' qvalue ' + qarray[index].ans);
                }


            }
        }

        return new Questionservice();
    })

    .controller("QuestionCtrl", function ($scope, Questionservice, ionicDatePicker) {

        $scope.service = Questionservice;
        $scope.questions = Questionservice.getQuestions();

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

        $scope.setanswers = function(qarray) {
            Questionservice.setanswers(qarray);
            console.log('came here in scope', qarray);
            console.log (Questionservice.questions[0].ans);
            console.log ($scope.questions[0].ans);
        }

    });

/*.controller("QuestionCtrl", function ($scope, Questions, ionicDatePicker) {
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
 */