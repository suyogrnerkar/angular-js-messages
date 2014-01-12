export default function ($location, $cookies, $q) {
  return {
    'checkUserStatus': function () {
      let
        userObj = JSON.parse($cookies.get('userObj')),
        defer = $q.defer();

      if (userObj) {
        if (userObj.isLoggedIn) {
          defer.resolve("Valid user session");
        }
        else {
          defer.reject();
          $location.path('/login');
        }
      }
      else {
        defer.reject("Invalid user session!");
        $location.path('/login');
      }
      return defer.promise;
    }
  };
}