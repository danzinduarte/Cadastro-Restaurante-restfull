angular.module('app.setor')
.factory('SetorService', function(api) {
    
    var setorFactory = {};

    setorFactory.getAll = function (){
        var ds = new api.setor();
        return ds.$get()
    }
    return setorFactory;

});