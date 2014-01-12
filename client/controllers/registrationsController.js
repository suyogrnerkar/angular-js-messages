export default function ($scope, $location, $http, $cookies) {
  $scope.register = function () {
    $location.path('/login');
    $http.post(rootUrl + '/register', $scope.regform)
      .then(function () {
        $location.path('/login');
      });
    alert("Registered successfully");
  };
}
