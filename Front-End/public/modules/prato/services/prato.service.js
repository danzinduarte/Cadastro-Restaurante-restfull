angular.module('app.prato')
.factory('PratoService', function(api) {
    
    var pratoFactory = {};

    pratoFactory.getAll = function (){
        var ds = new api.prato();
        return ds.$get()
    }
    pratoFactory.save = function(nomeDoPrato, preco){
        var ds = new api.prato();
            ds.nomeDoPrato      = nomeDoPrato
            ds.preco            = preco
            return ds.$save()               				
                 				        
    }
    pratoFactory.delete = function(pratoId){
        var ds = new api.prato();
        ds.id = pratoId
        return ds.$delete({id : pratoId})
    }
    pratoFactory.getById =function(pratoId) {
        var ds      = new api.prato();
        ds.id   = pratoId;
        return ds.$get();
    }

    return pratoFactory;

});