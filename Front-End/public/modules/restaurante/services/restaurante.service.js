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
    return restauranteFactory;

});