angular.module('app.prato')
.controller('EditaPratoController', EditaPratoController);

function EditaPratoController(PratoService, pratoId,$state)
{
    vm = this;
    
    vm.dataset = {}

    function init(){

        if (pratoId) {
            PratoService.getById(pratoId).then(function(pratoModel){
                vm.dataset = pratoModel.data
            })
        }
	}

    init()	
  
    vm.salvaPrato    = salvaPrato;
    vm.cancelar            = cancelar;

	function salvaPrato(){

        if (vm.form.$invalid) {
            toastr.error("Erro! Revise seus dados e tente novamente.","ERRO")
            return
        } 
        var pratoModel = {}
        pratoModel.id    = pratoId

        PratoService.save(pratoModel)
		.then(function(resposta){
             if (resposta.sucesso) {				
                if (pratoId) {
                    toastr.info("Prato atualizado com êxito :)","SUCESSO")
                }
                else {
                    toastr.success("Prato incluído com êxito :)","SUCESSO")
                }

                $state.go('prato')
            }
		})
		.catch(function(error){
            console.log(error)
            toastr.error("Erro! Revise seus dados e tente novamente.","ERRO")
		})
    }
    function cancelar() {
        $state.go('prato')
    }
}