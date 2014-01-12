export default function ($scope, $location) {
  $scope.signUp = function () {
    $location.path('/registration');
  };
}