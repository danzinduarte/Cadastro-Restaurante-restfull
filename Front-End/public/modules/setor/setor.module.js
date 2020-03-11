(function ()
{
  'use strict';

  angular
    angular.module('app.setor', [])
    .config(config);
  
  function config($stateProvider)
  {
    // State
    $stateProvider

    .state('setor-id', {
        url: '/setor-id',
        templateUrl: './modules/setor/views/setor-id.html',
        controller: 'SetorController',
        controllerAs: 'vm',
        params: {
            title: "setor"
        }
    })
    .state('setor', {
        url: '/setor',
        templateUrl: './modules/setor/views/setor.html',
        controller: 'SetorController',
        controllerAs: 'vm',
        params: {
            title: "setor"
        }
    })
  }
 

  
})()