export default function ($scope, $http, $location, $cookies, $rootScope, rootUrl) {
  var message = [],
    userObj = $cookies.get('userObj');

  var obj = {
    user: JSON.parse(userObj).data.username
  };

  $scope.GoBack = function () {
    $location.path('/home');
  };

  $http.post(rootUrl + '/messagesave', obj).then(function (resp) {
    $scope.messages = resp.data.data;
    message = $scope.messages;
  });

  $scope.details = function (index) {
    $location.path('/msgdetails');
    $rootScope.messages = message[index];
  };
}