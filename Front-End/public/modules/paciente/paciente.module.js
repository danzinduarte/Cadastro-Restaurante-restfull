(function ()
{
  'use strict';

  angular
    angular.module('app.paciente', [])
    .config(config);
  
  function config($stateProvider)
  {
    // State
    $stateProvider
    
    .state('paciente', {
        url: '/paciente',
        templateUrl: './modules/paciente/views/paciente.html',
        controller: 'PacienteController',
        controllerAs: 'vm',
        params: {
            title: "paciente"
        }
    })
  }
 

  
})()