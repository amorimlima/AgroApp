(function() {
  angular
    .module('app')
    .factory('DateHelper', DateHelper);

  function DateHelper() {
    var format = function (date) {
      var fmt = new Date(date);
      var day   = fmt.getDate()  < 10 ? '0' + fmt.getDate()        : fmt.getDate();
      var month = fmt.getMonth() < 9  ? '0' + (fmt.getMonth() + 1) : (fmt.getMonth() + 1);
      var year  = fmt.getFullYear(); 

      return day + '/' + month + '/' + year;
    };

    var toIsoStandard = function (date) {
      var fmt = new Date(date);
      var day   = fmt.getDate()  < 10 ? '0' + fmt.getDate()        : fmt.getDate();
      var month = fmt.getMonth() < 9  ? '0' + (fmt.getMonth() + 1) : (fmt.getMonth() + 1);
      var year  = fmt.getFullYear(); 

      return year + '-' + month + '-' + day;
    };
    
    return {
      format: format,
      toIsoStandard: toIsoStandard
    };
  }
})();
