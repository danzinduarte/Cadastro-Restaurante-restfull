(function ()
{
    'use strict';

    angular
        .module('materialApp')
        .factory('api', apiService);
    
    function apiService($resource)
    {

      var api = {}      

      // Base Url
      api.baseUrl = 'http://localhost:5000/api/';

      
      /* Recursos da API */ 
      api.log   = $resource(api.baseUrl + 'log/:id', {id : '@id'},
        {update: {
          method: 'PUT'
        }
      })


      api.convidado = $resource(api.baseUrl + 'convidado/:id' , {id :'@id'}, {
        update : {
            method : 'PUT'
        }
      })

      api.usuario = $resource(api.baseUrl + 'usuario/:id' , {id :'@id'}, {
        update : {
            method : 'PUT'
        }
      })
      api.restaurante = $resource(api.baseUrl + 'restaurantes/:id' , {id :'@id'}, {
        update : {
            method : 'PUT'
        }
      })
      api.setor = $resource(api.baseUrl + 'setor/:id' , {id :'@id'}, {
        update : {
            method : 'PUT'
        }
      })

      api.paciente = $resource(api.baseUrl + 'paciente/:id' , {id :'@id'}, {
        update : {
            method : 'PUT'
        }
      })


      api.autenticacao = $resource(api.baseUrl + 'login');

      return api;
    }

})();
