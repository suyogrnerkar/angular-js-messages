import angular from "angular";
import ngRoute from "angular-route";

import IndexController from "./controllers/indexController";
import LoginController from "./controllers/loginController";
import RegistrationsController from "./controllers/registrationsController";
import ProfileController from "./controllers/profileController";
import MessageController from "./controllers/messageController";
import HomeController from "./controllers/homeController";
import MessageDetailsController from "./controllers/messageDetailsController";

import authService from "./services/authService";

import Routes from "./routes";

let
  app = angular.module('messages-app', [ngRoute, require("angular-cookies")]),
  rootUrl = '.';

app.value('rootUrl', rootUrl);

app.controller('IndexController', IndexController);
app.controller('LoginController', LoginController);
app.controller('RegistrationsController', RegistrationsController);
app.controller('ProfileController', ProfileController);
app.controller('MessageController', MessageController);
app.controller('HomeController', HomeController);
app.controller('MessageDetailsController', MessageDetailsController);

app.factory('authService', authService);

app.config(function ($routeProvider) { Routes($routeProvider, rootUrl); });