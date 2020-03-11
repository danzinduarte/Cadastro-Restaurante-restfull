angular.module('app.restaurante')
.controller('RestauranteController', RestauranteController);

function RestauranteController(RestauranteService,$mdDialog, $state)
{
    vm = this
    function init(){
        carregaRestaurantes()
    }
    init ()      
    
    vm.carregaRestaurantes  = carregaRestaurantes;
    vm.novoRestaurante      = novoRestaurante;
    vm.editaRestaurante     = editaRestaurante;
    

    function carregaRestaurantes(){
        RestauranteService.getAll().then(function(resposta){
            vm.dataset = resposta.data
           
        })
    } 
    function novoRestaurante(){
		$state.go('restaurante-novo')	
    }
    function editaRestaurante(restauranteId) {
		$state.go('restaurante-editar', {id : restauranteId})		
    }
    function exclui(ev,restaurantes){
		
        let confirmacao = $mdDialog.confirm()
                .title('Aguardando confirmação')
                .textContent('Confirma a exclusao do restaurante ' + restaurantes.nomeDoRestaurante)
                .ariaLabel('Msg interna do botao')
                .targetEvent(ev)
                .ok('Sim')
                .cancel('Não');

        $mdDialog.show(confirmacao).then(function() {
                vm.excluir(restaurantes.id)
        });
    }


}