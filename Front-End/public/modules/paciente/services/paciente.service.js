angular.module('app.paciente')
.factory('PacientesService', function(api) {
    
    var pacienteFactory = {};

    pacienteFactory.getAll = function (){
        var ds = new api.paciente();
        return ds.$get()
    }
    return pacienteFactory;

});