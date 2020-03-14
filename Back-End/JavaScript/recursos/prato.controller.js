const dataContext = require('../dao/dao');

function carregaTudo(req,res) 
{
	return dataContext.Prato.findAll({
	}).then(function(pratos)
	{
    	res.status(200).json(
		{
        	sucesso : true,
            data : pratos
        })
    }).catch(function(err)
	{
		res.status(400).json(
		{ 	
			sucesso: false,
			data : [],
			erros : err
		});
		return err;	
	})
}

function carregaPorId(req,res) 
{
	return dataContext.Prato.findByPk(req.params.id)
	.then(function(prato){
		if (!prato) 		{
			res.status(404).json({
				sucesso: false,
				msg: "Prato não encontrado."
			})
			return;
		}

        res.status(200).json({
			sucesso: true,
			data: prato
		})
    })
}

function salvaPrato(req,res)
{
	let prato = req.body

	if (!prato){
		res.status(400).json({
			sucesso: false, 
			msg: "Formato de entrada inválido."
		})
		return;
	}
	dataContext.Prato.create(prato)

	.then(function(novoPrato){
		res.status(201).json({
			sucerro : true,
			data : novoPrato
		})
	})
	.catch(function(err){
		res.status(404).json({
			sucesso : false,
			msg: "Falha ao incluir o Prato",
			erro: err
		})
	})
}


function excluiPrato(req,res){
	if (!req.params.id){
		return res.status(400).json({
			sucesso: false,
			msg: "Formato de entrada inválido."
		})
	}

	dataContext.Prato.findByPk(req.params.id).then(function(prato){
		if (!prato){
			return res.status(404).json({
				sucesso : false,
				msg: "Prato não encontrado"
			})
		}

		dataContext.Prato.destroy ({ where : { id : req.params.id}})
		.then(function(result){
			return res.status(200).json({
				sucesso : true,
				msg : "Prato excluido com sucesso!"
			})
		})
	}).catch(function(error){
		return res.status(400).json({
			sucesso: false,
			msg: "Falha ao excluir Prato",
			erro: error
		});
	})
}

function atualizaPrato(req,res){


	let prato = req.body

	if(!prato){
		return res.status(400).json({
			sucesso: false,
			msg: "Formato de entrada inválido"
		})
	}

	if(!req.params.id){
		return res.status(400).json({
			sucesso: false,
			msg: "Um id deve ser informado!"
		})
	}

	dataContext.Prato.findByPk(req.params.id)
	.then(function(pratoBanco){
		if(!pratoBanco){
			return res.status(404).json({
				sucesso: false,
				msg: "Prato não encontrado"
			});
		}
		let updateFields = {
			nomeDoPrato : prato.nomeDoPrato,
			preco 		: prato.preco
		}

		pratoBanco.update(updateFields).then(function(pratoAtualizado){
			return res.status(200).json({
				sucerro: true,
				msg: "Prato Atualizado com Sucesso",
				data: pratoAtualizado
			})
		})
	}).catch(function(error){
		return res.status(404).json({
			sucesso: false,
			msg: "Falha ao Atualizar o Prato"
		})
	})
}

module.exports = 
{
	//Quando for consumir irá pegar os nomes da primeira tabela
    carregaTudo  	: carregaTudo,
    carregaPorId 	: carregaPorId,
    salva 			: salvaPrato,
    exclui 			: excluiPrato,
	atualiza 		: atualizaPrato,  
}