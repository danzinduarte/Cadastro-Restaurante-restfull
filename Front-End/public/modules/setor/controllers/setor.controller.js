angular.module('app.setor')
.controller('SetorController', SetorController);

function SetorController($localStorage, SetorService,$mdDialog, $state)
{
    vm = this
    function init(){
        carregaSetores()
    }
    init ()      
    
    vm.carregaSetores  = carregaSetores;
    vm.abrirSetor      = abrirSetor;
    

    function carregaSetores(){
        SetorService.getAll().then(function(resposta){
            vm.dataset = resposta.data
           
        })
    } 
    function abrirSetor(){
		$state.go('setor-id')	
    }


}