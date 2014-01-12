export default function ($router, rootUrl) {
  $router
    .when('/', {
      redirectTo: '/login'
    })

    .when('/login', {
      controller: 'LoginController',
      templateUrl: rootUrl + '/views/login.html'
    })

    .when('/registration', {
      controller: 'RegistrationsController',
      templateUrl: rootUrl + '/views/registration.html'
    })

    .when('/home', {
      controller: 'HomeController',
      templateUrl: rootUrl + '/views/home.html',
      resolve: ['authService', function (authService) {
        return authService.checkUserStatus();
      }]
    })
    .when('/profile', {
      controller: 'ProfileController',
      templateUrl: rootUrl + '/views/profile.html',
      resolve: ['authService', function (authService) {
        return authService.checkUserStatus();
      }]
    })
    .when('/messages', {
      controller: 'MessageController',
      templateUrl: rootUrl + '/views/messages.html',
      resolve: ['authService', function (authService) {
        return authService.checkUserStatus();
      }]
    })
    .when('/msgdetails', {
      controller: 'MessageDetailsController',
      templateUrl: rootUrl + '/views/messageDetails.html',
      resolve: ['authService', function (authService) {
        return authService.checkUserStatus();
      }]
    })
    .otherwise({
      redirectTo: '/'
    });
}