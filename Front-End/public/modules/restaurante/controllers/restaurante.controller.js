angular.module('app.restaurante')
.controller('RestauranteController', RestauranteController);

function RestauranteController(RestauranteService,$mdDialog, $state)
{
    vm = this;
    vm.carregaRestaurantes  = carregaRestaurantes;
    vm.novoRestaurante      = novoRestaurante;
    vm.editaRestaurante     = editaRestaurante;
    vm.excluiRestaurante    = excluiRestaurante;
    vm.excluir              = excluir;
    vm.listaRestaurante     = listaRestaurante;
    vm.fnFiltraRestaurante  = fnFiltraRestaurante;


    function init(){
        carregaRestaurantes()
    }
    init ()      
      

    function carregaRestaurantes(){
        RestauranteService.getAll().then(function(restaurantes){
            vm.dataset = restaurantes.data
            return vm.dataset
        })
    } 
    function novoRestaurante(){
		$state.go('restaurante-novo')	
    }
    function editaRestaurante(restauranteId) {
		$state.go('restaurante-edita', {id : restauranteId})		
    }
    
    function excluiRestaurante(ev,restaurantes){
		
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
    function excluir(restauranteId){
        let sucesso = function(resposta){			
            if (resposta.sucesso) {
                toastr.info('Restaurante excluido com sucesso :)');
            }
            carregaRestaurantes();
        }

        let erro = function(resposta){	
            toastr.warning("Ocorreu um erro ao excluir o restaurante!")
            $state.go('restaurante')	
        }

        RestauranteService.delete(restauranteId).then(sucesso,erro) 
    }
    function listaRestaurante(nomeRestaurante) {
    	return RestauranteService.getRestaurantes(nomeRestaurante).then(function(restauranteModel){
        	vm.dataset = restauranteModel.data;
       			return vm.dataset
     	})
    }
    function fnFiltraRestaurante(filtro) {
		vm.nomeDoRestaurante = filtro
	}
}