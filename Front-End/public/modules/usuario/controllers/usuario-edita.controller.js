angular.module('app.usuario')
.controller('EditaUsuarioController', EditaUsuarioController);

function EditaUsuarioController($localStorage, usuarioService,$mdDialog, $state,usuarioId)
{
    function init(){
        if (usuarioId) {
            usuarioService.getUsuario(usuarioId).then(function(usuarioModel){
                  vm.ds = usuarioModel.data
                  vm.ds.usuarioSenha1 = vm.ds.senha
              })  
          }
      }    
      
      init()        
    
    
    vm 		            = this
    vm.show             = show
    vm.cancelar         = cancelar
    vm.status           = status


    function cancelar() {
        $state.go('usuario')
    }

   
    vm.tipo = 'password'
    vm.status = 'view'
    
    function show (tipo) {
        if (tipo == 'view') {
            vm.tipo  = 'text';
            vm.status = 'hide';
        } else {
            vm.tipo  =  'password';
            vm.status = 'view'
        }
    }
}