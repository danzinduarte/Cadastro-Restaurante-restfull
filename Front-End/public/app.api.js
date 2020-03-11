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

      api.restaurante = $resource(api.baseUrl + 'restaurantes/:id' , {id :'@id'}, {
        update : {
            method : 'PUT'
        }
      })
      api.prato = $resource(api.baseUrl + 'pratos/:id' , {id :'@id'}, {
        update : {
            method : 'PUT'
        }
      })
      return api;
    }

})();
