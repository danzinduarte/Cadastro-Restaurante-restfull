angular.module('app.usuario')
.controller('NovoUsuarioController', NovoUsuarioController);

function NovoUsuarioController(usuarioService,$state)
{
    vm           = this
    vm.salvar    = salvar
    vm.cancelar  = cancelar
    vm.status    = status
    vm.show      = show
        
    function salvar(nome, email, senha) {

        if (vm.form.$invalid) {
            toastr.error("Erro! Revise seus dados e tente novamente.","ERRO")
            return
        } 

            usuarioService.save(nome, email, senha)
            .then(function(resposta) {
                if (resposta.sucesso) {
                    toastr.success("Dados inseridos com sucesso","SUCESSO")
                }
                $state.go("usuario")
            })
    }
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