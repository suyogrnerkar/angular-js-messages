export default function ($scope, $location, $http, $cookies, rootUrl) {

  $scope.GoBack = function () {
    $location.path('/home');
  };

  $scope.register = function (regForm) {
    var userObj = $cookies.get('userObj');
    var obj = {
      userDetails: regForm,
      user: JSON.parse(userObj).data.username
    };
    $http.post(rootUrl + '/profile', obj)
      .then(function (resp) {
        console.log(resp);
      });
    alert("Updated successfully");
  };
}
