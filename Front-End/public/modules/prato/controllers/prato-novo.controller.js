angular.module('app.prato')
.controller('NovoPratoController', NovoPratoController);

function NovoPratoController(PratoService,$state, pratoId)
{
    vm              = this;
    vm.salvaPrato   = salvarPrato;
    vm.cancelar     = cancelar;

    function init(){

        if (pratoId) {
            PratoService.getById(pratoId).then(function(pratoModel){
                vm.dataset = pratoModel.data
            })
        }
	}

    init()
        
    function salvarPrato() {

        if (vm.form.$invalid) {
            toastr.error("Erro! Revise seus dados e tente novamente.","ERRO")
            return
        } 
        var pratoModel = {},
        prato = {
            nomeDoPrato : vm.dataset.nomeDoPrato,
            preco       : vm.dataset.preco
        }
        pratoModel      = prato;
        pratoModel.id   = pratoId 

        PratoService.save(pratoModel)
        .then(function(resposta) 
        {
            if (resposta.sucesso) 
            {	
                if (pratoId) 
                {
                    toastr.info("Prato atualizado com êxito :)","SUCESSO")
                    
                }
                else 
                {
                    toastr.success("Prato incluído com êxito :)","SUCESSO")
                }
                $state.go('restaurante')
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