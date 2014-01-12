export default function ($scope, $location, $cookies, $rootScope) {
  $scope.profile = function () { $location.path('/profile'); };
  $scope.message = function () { $location.path('/messages'); };
  $scope.logout = function () {
    $location.path('/login');
    $cookies.remove("userObj");
  };
}