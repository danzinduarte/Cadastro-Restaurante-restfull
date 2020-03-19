angular.module('app.restaurante')
.controller('RestauranteEditaController', RestauranteEditaController);

function RestauranteEditaController(RestauranteService, restauranteId, $state)
{
    vm = this;
    vm.dataset = {}
    vm.salvaRestaurante    = salvaRestaurante;
    vm.cancelar            = cancelar;

    function init(){

        if (restauranteId) {
            RestauranteService.getById(restauranteId).then(function(restauranteModel){
                vm.dataset = restauranteModel.data
            })
        }
	}

    init()	

    function salvaRestaurante(){
        if (vm.form.$invalid) 
        {
            toastr.error("Erro! Revise seus dados e tente novamente.","ERRO")
            return
        } 

       var restauranteModel = {},
       restaurante = {
           nomeDoRestaurante : vm.dataset.nomeDoRestaurante
       }
        
        restauranteModel = restaurante; 
        restauranteModel.id = restauranteId
        
        RestauranteService.save(restauranteModel)
        .then(function(resposta){
            if (resposta.sucesso) 
            {	
                if (restauranteId){
                    toastr.info("Restaurante atualizado com êxito :)","SUCESSO")
                }
                else 
                {
                    toastr.success("Restaurante incluído com êxito :)","SUCESSO")
                }
                $state.go('restaurante')
            }
        })
        .catch(function(error){
            toastr.error("Erro! Revise seus dados e tente novamente.","ERRO")
        })
    }
    function cancelar() {
        $state.go('restaurante')
    }
}