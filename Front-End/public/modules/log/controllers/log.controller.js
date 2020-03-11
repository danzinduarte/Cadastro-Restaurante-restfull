angular.module('app.log')
.controller('LogController', LogController);

function LogController($localStorage, LogService,$mdDialog, $state)
{
    vm = this
    function init(){
        carregaLogs()
    }
    init ()      
    
    vm.carregaLogs  = carregaLogs;
    

    function carregaLogs(){
        LogService.getAll().then(function(resposta){
            vm.dataset = resposta.data
           
        })
    } 

}