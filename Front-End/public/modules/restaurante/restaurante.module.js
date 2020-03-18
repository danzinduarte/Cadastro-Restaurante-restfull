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
        controller: 'RestauranteEditaController',
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
      url: '/restaurante-edita/:id',
      templateUrl: '/modules/restaurante/views/restaurante-edita.html',
      controller: 'RestauranteEditaController',
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