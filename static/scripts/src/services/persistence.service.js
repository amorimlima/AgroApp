class PersistenceService {
  constructor($cookies) {
    this.$cookies = $cookies;
  }
  
  getSessionItem(key) {
    if ('sessionStorage' in window)
      return sessionStorage.getItem(key);
    else
      return this.$cookies.get(key);
  }
  
  setSessionItem(key, val) {
    if (typeof key !== 'string' || typeof val === 'object') {
      throw new TypeError('Params must not be complex structures');
    }

    if ('sessionStorage' in window)
      return sessionStorage.setItem(key, val);
    else
      return this.$cookies.put(key, val, { expires: new Date(2021, 11, 31) });
  }

  clearSessionItems() {
    if ('sessionStorage' in window)
      return sessionStorage.clear();
    else
      return false;
  }

  getPreference(key) {
    if ('localStorage' in window)
      return localStorage.getItem(key);
    else
      return this.$cookies.get(key);
  }

  setPreference(key, val) {
    if (typeof key !== 'string' || typeof val !== 'object') {
      throw new TypeError('Params must not be complex structures');
    }
    
    if ('localStorage' in window)
      return localStorage.setItem(key, val);
    else
      return this.$cookies.put(key, val, { expires: new Date(2021, 11, 31) });
  }
}

PersistenceService.$inject = [
  '$cookies'
];

module.exports = PersistenceService;
