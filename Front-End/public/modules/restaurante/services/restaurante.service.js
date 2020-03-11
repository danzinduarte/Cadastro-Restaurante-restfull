angular.module('app.restaurante')
.factory('RestauranteService', function(api) {
    
    var restauranteFactory = {};

    restauranteFactory.getAll = function (){
        var ds = new api.restaurante();
        return ds.$get()
    }
    restauranteFactory.save = function(nomeDoRestaurante){
        var ds = new api.restaurante();
            ds.nomeDoRestaurante      = nomeDoRestaurante
           
            return ds.$save()               				
                 				        
    }
    restauranteFactory.delete = function(restauranteId){
        var ds = new api.restaurante();
        ds.id = restauranteId
        return ds.$delete({id : restauranteId})
    }
    restauranteFactory.getById =function(restauranteId) {
        var ds      = new api.restaurante();
        ds.id   = restauranteId;
        return ds.$get();
    }

    return restauranteFactory;

});