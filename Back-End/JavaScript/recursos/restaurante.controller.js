const dataContext = require('../dao/dao'),

function carregaTudo(req,res) 
{
	if (req.query.restaurante) 
	{
		return dataContext.Restaurante.findAll({
			where :
			{
				Id : req.query.restaurante
			},
			order : 'id'
		}).then(function(restaurantes)
		{
			restaurantes = restaurantes.map(function(restaurantesRetornados) 
			{
				restaurantesRetornados = restaurantesRetornados.get({plain : true})
				return restaurantesRetornados
			})	
			res.status(200).json(
			{
				sucesso:true,
				data: restaurantes
			})
		})
	}
}

function carregaPorId(req,res) 
{
	return dataContext.Restaurante.findById(req.params.id,
	).then(function(restaurante)
	{
		if (!restaurante) 
		{
			res.status(404).json(
			{
				sucesso: false,
				msg: "Restaurante não encontrado."
			})
			return;
		}

		restaurante = restaurante.get({plain : true})
        res.status(200).json(
        {
			sucesso: true,
			data: restaurante
		})
    })
}

function salvaRestaurante(req,res)
{

	let restaurante = req.body.restaurante,
	restaurante = 
	{
		restaurante  : restaurante.restaurante,
	}

	if (!restaurante) 
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
			dataContext.Restaurante.create(
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
		console.log(erro);
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