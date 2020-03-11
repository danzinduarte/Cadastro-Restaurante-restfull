angular.module('app.prato')
.controller('NovoPratoController', NovoPratoController);

function NovoPratoController(PratoService,$state)
{
    vm           = this
    vm.salvar    = salvar
    vm.cancelar  = cancelar

        
    function salvar(nomeDoPrato, preco) {

        if (vm.form.$invalid) {
            toastr.error("Erro! Revise seus dados e tente novamente.","ERRO")
            return
        } 

        PratoService.save(nomeDoPrato, preco)
            .then(function(resposta) {
                if (resposta.sucesso) {
                    toastr.success("Dados inseridos com sucesso","SUCESSO")
                }
                $state.go("prato")
            })
    }
    function cancelar() {
        $state.go('prato')
    }
}