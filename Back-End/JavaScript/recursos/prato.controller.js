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
	return dataContext.Prato.findById(req.params.Id).then(function(prato){
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

	let prato = req.body.prato,
	restaurante = 
	{
		restaurante  : prato.restaurante,
	}

	if (!prato) 
	{
		res.status(404).json(
		{
			sucesso: false, 
			msg: "Formato de entrada inválido."
		})
		return;
	}


	dataContext.conexao.transaction(function(t) 
	{

		let dadosRestauranteCriado
		return dataContext.Restaurante.create(restaurante, {transaction : t})
		.then(function(restauranteCriado) 
		{
			dadosRestauranteCriado = restauranteCriado
			dataContext.Prato.create(
			{
				nomeDoPrato			: prato.nomeDoPrato,
				preco 				: prato.preco,
				restauranteId		: dadosRestauranteCriado.id
			}, {transaction : t})
		})
	})
	.then(function(novoPrato)
	{
		res.status(201).json(
		{
			sucesso: true, 
			data: novoPrato
		})
	}).catch(function(erro)
	{
		res.status(409).json(
		{ 
			sucesso: false,
			msg: "Falha ao incluir o novo prato" 
		});
	})
}

function excluiPrato(req,res)
{
	if (!req.params.id) 
	{
		res.status(409).json(
		{
			sucesso: false,
			msg: "Formato de entrada inválido."
		})
		return;
	}
	dataContext.conexao.transaction(function(t) 
	{
		let prato
		dataContext.Prato.findById(req.params.id, {transaction : t})
		.then(function(pratoEncontrado)
		{
			if (!pratoEncontrado) 
			{
				res.status(404).json(
				{
					sucesso: false,
					msg: "Prato não encontrado."
				})
				return;
			}
			prato = pratoEncontrado
			pratoEncontrada.destroy({transaction : t})
			return dataContext.Restaurante.findById(prato.restauranteId, {transaction : t})
		})
		.then(function(restauranteRetornado) 
		{
			restauranteRetornado.destroy({transaction : t})
		})
	})
	.then(function()
	{
		res.status(200).json(
		{
        	sucesso:true,
        	msg: "Registro excluído com sucesso",
        	data: []
        })	        	
	})
	.catch(function(erro)
	{
		res.status(409).json(
		{ 
			sucesso: false,
			msg: "Falha ao excluir o prato" 
		});	
	})
}

function atualizaPrato(req,res)
{
	if (!req.params.id) 
	{
		res.status(409).json(
		{
			sucesso: false,
			msg: "Formato de entrada inválido."
		})
		return;
	}

	let pratoForm	= req.body.prato;
	if (!pratoForm) {
		res.status(404).json({
			sucesso: false,
			msg: "Formato de entrada inválido."
		})
		return;
	}

	dataContext.conexao.transaction(function(t) 
	{
		dataContext.Prato.findById(req.params.id, {transaction : t})
		.then(function(prato)
		{
			if (!prato) 
			{
				res.status(404).json(
				{
					sucesso: false,
					msg: "Prato não encontrado."
				})
				return;
			}
			
			let updateFields = 
			{
				nomeDoPrato					: pratoForm.nome,
				preco						: pratoForm.preco
			}

			prato.update(updateFields, {transaction : t})
			return dataContext.Restaurante.findById(prato.restauranteId, {transaction : t})
		})
		.then(function(restauranteEncontrado)
		{
			let updateFields = 
			{
				restaurante 		: pratoForm.restaurante
			}

			return restauranteEncontrado.update(updateFields, {transaction : t})

		})	
	})
	//Commit
	.then(function(pratoAtualizado) 
	{	
		res.status(200).json(
		{
        	sucesso:true,
        	msg: "Registro atualizado com sucesso",
        	data: pratoAtualizado
        })	
	})
	//Roolback
	.catch(function(erro)
	{
		console.log(erro);
		res.status(409).json(
		{ 
			sucesso: false,
			msg: "Falha ao atualizar o prato" 
		});	
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