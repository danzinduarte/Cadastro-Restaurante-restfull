angular.module('app.restaurante')
.factory('RestauranteService', function(api) {
    
    var restauranteFactory = {};

    restauranteFactory.getAll = function (restauranteId){
        var ds = new api.restaurante();
        return ds.$get({restaurante : restauranteId})
    }
    restauranteFactory.getById =function(restauranteId) {
        var ds      = new api.restaurante();
        ds.id   = restauranteId;
        return ds.$get();
    }

    restauranteFactory.save = function(restauranteModel){
        var ds               = new api.restaurante();
        ds.nomeDoRestaurante = restauranteModel.nomeDoRestaurante;
        ds.id                = restauranteModel.id;
            if (ds.id) {
                return ds.$update();
            }
                return ds.$save();             				
                 				        
    }
    restauranteFactory.getRestaurante = function (restauranteId ){
        try {
            var ds = new api.restaurante();
        
            return restauranteId ? ds.$get({ id : restauranteId}) : ds.$get();
        } catch (error) {
            console.log(error);    
        }
    }
    restauranteFactory.delete = function(restauranteId){
        var ds = new api.restaurante();
        ds.id = restauranteId
        return ds.$delete({id : restauranteId})
    }   
    restauranteFactory.getRestaurante = function(restauranteModel) {
        var ds          = new api.restaurante;
            return ds.$get({nomeDoRestaurante: restauranteModel})
    }
    return restauranteFactory;

});