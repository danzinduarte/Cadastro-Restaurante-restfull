angular.module('app.prato')
.controller('PratoController', PratoController);

function PratoController(PratoService,$mdDialog, $state)
{
    vm = this
    function init(){
        carregaPratos()
    }
    init ()      
    
    vm.carregaPratos  = carregaPratos;
    vm.novoPrato      = novoPrato;
    vm.editaPrato     = editaPrato;
    vm.excluiPrato    = excluiPrato;
    vm.excluir        = excluir;
    

    function carregaPratos(){
        PratoService.getAll().then(function(resposta){
            vm.dataset = resposta.data
           
        })
    } 
    function novoPrato(){
		$state.go('prato-novo')	
    }
    function editaPrato(pratoId) {
		$state.go('prato-edita', {id : pratoId})		
    }
    function excluiPrato(ev,pratos){
		
        let confirmacao = $mdDialog.confirm()
                .title('Aguardando confirmação')
                .textContent('Confirma a exclusao do prato ' + pratos.nomeDoPrato)
                .ariaLabel('Msg interna do botao')
                .targetEvent(ev)
                .ok('Sim')
                .cancel('Não');

        $mdDialog.show(confirmacao).then(function() {
                vm.excluir(pratos.id)
        });
    }
    function excluir(pratoId){
        let sucesso = function(resposta){			
            if (resposta.sucesso) {
                toastr.info('Prato excluido com sucesso :)');
            }
            carregaPratos();
        }

        let erro = function(resposta){	
            toastr.warning("Ocorreu um erro ao excluir o Prato!")
            $state.go('prato')	
        }

        PratoService.delete(pratoId).then(sucesso,erro) 
    }


}