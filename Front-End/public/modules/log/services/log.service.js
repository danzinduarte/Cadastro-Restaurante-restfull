angular.module('app.log')
.factory('LogService', function(api) {
    
    var logFactory = {};

    logFactory.getAll = function (){
        var ds = new api.log();
        return ds.$get()
    }
    return logFactory;

});