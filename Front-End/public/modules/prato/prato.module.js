(function ()
{
  'use strict';

  angular
    angular.module('app.prato', [])
    .config(config);
  
  function config($stateProvider)
  {
    // State
    $stateProvider

    .state('prato-novo', {
        url: '/prato-novo',
        templateUrl: './modules/prato/views/prato-novo.html',
        controller: 'NovoPratoController',
        controllerAs: 'vm',
        params: {
            title: "Novo Prato"
        }
    })
    .state('prato', {
        url: '/prato',
        templateUrl: './modules/prato/views/prato.html',
        controller: 'PratoController',
        controllerAs: 'vm',
        params: {
            title: "Cadastro de Pratos"
        }
    })
    .state('prato-edita', {
      url: '/prato-editar',
      templateUrl: './modules/prato/views/prato-edita.html',
      controller: 'EditPratoController',
      controllerAs: 'vm',
      params: {
          title: "Editar Prato"
      }
  })
  }  
})()