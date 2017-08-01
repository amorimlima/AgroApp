(function () {
  angular
    .module('app')
    .service('PersistenceService', PersistenceService);

  PersistenceService.$inject = [
    '$cookies'
  ];

  function PersistenceService($cookies) {
    this.getSessionItem = function (key) {
      if ('sessionStorage' in window)
        return sessionStorage.getItem(key);
      else
        return $cookies.get(key);
    }
    
    this.setSessionItem = function (key, val) {
      if (typeof key !== 'string' || typeof val === 'object') {
        throw new TypeError('Params must not be complex structures');
      }

      if ('sessionStorage' in window)
        return sessionStorage.setItem(key, val);
      else
        return $cookies.put(key, val, { expires: new Date(2021, 11, 31) });
    }

    this.clearSessionItems = function () {
      if ('sessionStorage' in window)
        return sessionStorage.clear();
      else
        return false;
    }

    this.getPreference = function (key) {
      if ('localStorage' in window)
        return localStorage.getItem(key);
      else
        return $cookies.get(key);
    }

    this.setPreference = function (key, val) {
      if (typeof key !== 'string' || typeof val !== 'object') {
        throw new TypeError('Params must not be complex structures');
      }
      
      if ('localStorage' in window)
        return localStorage.setItem(key, val);
      else
        return $cookies.put(key, val, { expires: new Date(2021, 11, 31) });
    }
  }
})();
