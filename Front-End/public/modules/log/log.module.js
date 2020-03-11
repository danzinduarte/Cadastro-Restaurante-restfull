(function ()
{
  'use strict';

  angular
    angular.module('app.log', [])
    .config(config);
  
  function config($stateProvider)
  {
    // State
    $stateProvider
      
    .state('log', {
        url: '/log',
        templateUrl: './modules/log/views/log.html',
        controller: 'LogController',
        controllerAs: 'vm',
        params: {
            title: "Log"
        }
    })
  }
  
})()