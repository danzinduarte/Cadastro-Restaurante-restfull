(function ()
{
  'use strict';

  angular
    angular.module('app.usuario', [])
    .config(config);
  
  function config($stateProvider)
  {
    // State
    $stateProvider
      
    .state('usuario', {
        url: '/usuario',
        templateUrl: './modules/usuario/views/usuario.html',
        controller: 'UsuarioController',
        controllerAs: 'vm',
        params: {
            title: "Usuarios"
        }
    })
    .state('usuario-novo', {
      url: '/usuario/novo',
      templateUrl: './modules/usuario/views/usuario-novo.html',
      controller: 'NovoUsuarioController',
      controllerAs: 'vm',
      params: {
          title: "Novo Usuario"
      }        
    })
    .state('usuario-editar', {
      url: '/usuario/usuario-editar/:id',
      templateUrl: '/modules/usuario/views/usuario-editar.html',
      controller: 'EditaUsuarioController',
      controllerAs: 'vm',
      params: {
          title: "Editar Usuario"
      },
      resolve : {
          usuarioId : function($stateParams){
              return $stateParams.id;
          }  
      }        
    })
  }
  
})()