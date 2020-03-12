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
        var ds = new api.restaurante();
        ds.restaurante = restauranteModel;
        ds.id          = restauranteModel.id;
            if (ds.id) {
                return ds.$update();
            }
                return ds.$save();             				
                 				        
    }
    restauranteFactory.delete = function(restauranteId){
        var ds = new api.restaurante();
        ds.id = restauranteId
        return ds.$delete({id : restauranteId})
    }
   
    return restauranteFactory;

});