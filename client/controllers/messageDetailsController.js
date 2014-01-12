export default function ($http, $scope, $location, $rootScope, rootUrl) {

  $scope.GoBack = function () {
    $location.path('/messages');
  };

  var count, id;

  $scope.important = function () {
    console.log('imp');
    count = $rootScope.messages.important;
    id = $rootScope.messages._id;
    count++;
    var obj = {
      count: count,
      id: id
    };

    $http.post(rootUrl + '/important', obj).then(function (resp) {
      //console.log(resp);
    });
  };

  var id1;

  $scope.delete = function () {
    id1 = $rootScope.messages._id;
    var obj = { id: id1 };
    $http.post(rootUrl + '/deletemsg', obj).then(function (resp) {
      alert('deleted successfully');
      $location.path('/messages');
    });
  };

  var replyId;

  $scope.reply = function (v) {
    replyId = $rootScope.messages._id;
    var obj = {
      id: replyId,
      reply: v.reply
    };

    $http.post(rootUrl + '/reply', obj).then(function (resp) {
      $scope.replyMessage = resp.data.data.reply;
    });

    $scope.re.reply = "";
  };
}
