angular.module('app.prato')
.factory('PratoService', function(api) {
    
    var pratoFactory = {};

    pratoFactory.getAll = function (pratoId){
        var ds = new api.prato();
        return ds.$get({prato : pratoId})
    }
    pratoFactory.getById =function(pratoId) {
        var ds      = new api.prato();
        ds.id   = pratoId;
        return ds.$get();
    }
    pratoFactory.save = function(pratoModel){
        var ds = new api.prato();
            ds.nomeDoPrato      = pratoModel.nomeDoPrato;
            ds.preco            = pratoModel.preco;
            ds.id               = pratoModel.id;
            if (ds.id) {
                return ds.$update();
            }
                return ds.$save();                				
                 				        
    }
    pratoFactory.delete = function(pratoId){
        var ds = new api.prato();
        ds.id = pratoId
        return ds.$delete({id : pratoId})
    }
   
    return pratoFactory;

});