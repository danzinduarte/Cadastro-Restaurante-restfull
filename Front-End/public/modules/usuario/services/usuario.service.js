angular.module('app.usuario')
.factory('usuarioService', function(api) {
    
    var usuarioFactory = {};

    usuarioFactory.getAll = function (){
        var ds = new api.usuario();
        return ds.$get()
    }

    usuarioFactory.getUsuario = function(usuarioId) {
        
        var ds = new api.usuario();
        ds.id = usuarioId;
        return ds.$get()
    }
   
    usuarioFactory.delete = function(usuarioId){
        var ds = new api.usuario();
        ds.id = usuarioId

        return ds.$delete({id : usuarioId})
    }

    usuarioFactory.save = function(nome, email, senha){
        var ds = new api.usuario();
            ds.nome      = nome
            ds.email     = email
            ds.senha     = senha
            return ds.$save()               				
                 				        
    }

    return usuarioFactory;

});