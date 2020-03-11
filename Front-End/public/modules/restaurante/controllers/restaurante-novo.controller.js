angular.module('app.restaurante')
.controller('NovoRestauranteController', NovoRestauranteController);

function NovoRestauranteController(RestauranteService,$state)
{
    vm           = this
    vm.salvar    = salvar
    vm.cancelar  = cancelar

        
    function salvar(nomeDoRestaurante) {

        if (vm.form.$invalid) {
            toastr.error("Erro! Revise seus dados e tente novamente.","ERRO")
            return
        } 

        RestauranteService.save(nomeDoRestaurante)
            .then(function(resposta) {
                if (resposta.sucesso) {
                    toastr.success("Dados inseridos com sucesso","SUCESSO")
                }
                $state.go("restaurante")
            })
    }
    function cancelar() {
        $state.go('restaurante')
    }
}