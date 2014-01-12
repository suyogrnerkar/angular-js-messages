export default function ($scope, $http, $location, $cookies, rootUrl) {
  $scope.login = function () {
    $http.post(rootUrl + '/loginuser', $scope.authform)
      .then(function (resp) {
        if (resp.data.isLoggedIn == true) {
          $scope.resp = resp.data;
          /////STORING USER DATA IN COOKIE////////
          $cookies.put('userObj', JSON.stringify(resp.data));
          $location.path('/home');
        } else {
          $location.path('/registration');
        }
      });
  };
}
