angular.module('app.paciente')
.controller('PacienteController', PacienteController);

function PacienteController($localStorage, PacienteService,$mdDialog, $state)
{
    vm = this
    function init(){
        carregaPacientes()
    }
    init ()      
    
    vm.carregaPacientes  = carregaPacientes;
   
    

    function carregaPacientes(){
        PacienteService.getAll().then(function(resposta){
            vm.dataset = resposta.data
           
        })
    } 

}