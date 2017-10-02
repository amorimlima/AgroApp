'use strict'

import angular from 'angular'
import 'angular-route'
import 'angular-cookies'
import 'angular-aria'
import 'angular-animate'
import 'angular-messages'
import 'angular-material'
import 'ng-mask'

const dependencies = [
  'ngAnimate',
  'ngAria',
  'ngCookies',
  'ngMaterial',
  'ngRoute',
  'ngMessages',
  'ngMask'
]

angular.module('app', dependencies)
