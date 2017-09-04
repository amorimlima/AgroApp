(function() {
  angular
    .module('app')
    .factory('HttpInterceptor', HttpInterceptor)
    .config(requestInterceptorConfig);

  HttpInterceptor.$inject = [
    '$rootScope',
    '$q'
  ];

  function HttpInterceptor($rootScope, $q) {
    var loadingCount = 0;

    return {
        request: function (config) {
            if(++loadingCount === 1) $rootScope.$broadcast('loading:progress');
            return config || $q.when(config);
        },

        response: function (response) {
            if(--loadingCount === 0) $rootScope.$broadcast('loading:finish');
            return response || $q.when(response);
        },

        responseError: function (response) {
            if(--loadingCount === 0) $rootScope.$broadcast('loading:finish');
            return $q.reject(response);
        }
    };
  }

  requestInterceptorConfig.$inject = [
    '$httpProvider'
  ];

  function requestInterceptorConfig($httpProvider) {
    $httpProvider.interceptors.push('HttpInterceptor');
  }
})();
