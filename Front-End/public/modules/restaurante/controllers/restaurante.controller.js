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
    vm.excluiRestaurante    = excluiRestaurante;
    vm.excluir              = excluir;
    

    function carregaRestaurantes(){
        RestauranteService.getAll().then(function(resposta){
            vm.dataset = resposta.data
           
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


}