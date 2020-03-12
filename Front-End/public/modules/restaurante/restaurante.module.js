(function ()
{
  'use strict';

  angular
    angular.module('app.restaurante', [])
    .config(config);
  
  function config($stateProvider)
  {
    // State
    $stateProvider

    .state('restaurante-novo', {
        url: '/restaurante-novo',
        templateUrl: './modules/restaurante/views/restaurante-novo.html',
        controller: 'NovoRestauranteController',
        controllerAs: 'vm',
        params: {
            title: "Novo Restaurante"
        },
        resolve : {
            restauranteId : function($stateParams){
                console.log('Modulo: ' + $stateParams.id)
                return $stateParams.id;
            }    
        }
    })
    .state('restaurante', {
        url: '/restaurante',
        templateUrl: './modules/restaurante/views/restaurante.html',
        controller: 'RestauranteController',
        controllerAs: 'vm',
        params: {
            title: "Cadastro de Restaurante",
            
        }
    })
    .state('restaurante-edita', {
      url: '/restaurante/restaurante-edita/:id',
      templateUrl: '/modules/restaurante/views/restaurante-edita.html',
      controller: 'EditaRestauranteController',
      controllerAs: 'vm',
      params: {
          title: "Editar Restaurante",
      },
      resolve : {
        restauranteId : function($stateParams){
              console.log('Modulo: ' + $stateParams.id)
              return $stateParams.id;
          }    
      }
  })
  }  
})()