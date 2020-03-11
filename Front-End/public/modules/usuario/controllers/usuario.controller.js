angular.module('app.usuario')
.controller('UsuarioController', UsuarioController);

function UsuarioController($localStorage, usuarioService,$mdDialog, $state)
{
    let vm = this
    function init(){
        carregaUsuarios()
    }
    init ()      
    
    
    vm.novoUsuario      = novoUsuario;
    vm.editaUsuario     = editaUsuario;
    vm.carregaUsuarios  = carregaUsuarios;
    vm.excluiUsuario    = excluiUsuario;
    vm.excluir          = excluir;

    function carregaUsuarios(){
        usuarioService.getAll().then(function(resposta){
            vm.dataset = resposta.data
           
        })
    } 


    function novoUsuario(){
		$state.go('usuario-novo')	
    }
    function editaUsuario(usuarioId) {
		$state.go('usuario-editar', {id : usuarioId})		
    }

    function excluiUsuario(ev,usuarios){
		
        let confirmacao = $mdDialog.confirm()
                .title('Aguardando confirmação')
                .textContent('Confirma a exclusão do usuario ' + usuarios.nome )
                .ariaLabel('Msg interna do botao')
                .targetEvent(ev)
                .ok('Sim')
                .cancel('Não');

        $mdDialog.show(confirmacao).then(function() {
                vm.excluir(usuarios.id)
        });
       
    }
        
    
    function excluir(usuarioId){
        let sucesso = function(resposta){			
            if (resposta.sucesso) {
                toastr.info('Usuario excluido com sucesso :)');
            }
            carregaUsuarios();
        }

        let erro = function(resposta){	
            toastr.warning("Ocorreu um erro ao excluir o usuario!")
            $state.go('usuario')	
        }

        usuarioService.delete(usuarioId).then(sucesso,erro) 
    }
}