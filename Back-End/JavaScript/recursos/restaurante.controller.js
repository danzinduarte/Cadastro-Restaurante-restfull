const dataContext = require('../dao/dao');

function carregaTudo(req,res) 
{
		return dataContext.Restaurante.findAll({
		}).then(function(restaurantes)
	{
    	res.status(200).json(
		{
        	sucesso : true,
            data : restaurantes
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

	let restaurante = req.body.restaurante
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
				restaurante			: restaurante.restaurante

			}, {transaction : t})
		})
	})
	.then(function(novoRestaurante)
	{
		res.status(201).json(
		{
			sucesso: true, 
			data: novoRestaurante
		})
	}).catch(function(erro)
	{
		console.log(erro);
		res.status(409).json(
		{ 
			sucesso: false,
			msg: "Falha ao incluir o novo restaurante" 
		});
	})
}

function excluiRestaurante(req,res)
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
		let restaurante
		dataContext.Restaurante.findById(req.params.id, {transaction : t})
		.then(function(restauranteEncontrado)
		{
			if (!restauranteEncontrado) 
			{
				res.status(404).json(
				{
					sucesso: false,
					msg: "Restaurante não encontrado."
				})
				return;
			}
			restaurante = restauranteEncontrado
			restauranteEncontrada.destroy({transaction : t})
			return dataContext.Restaurante.findById(restaurante.restauranteId, {transaction : t})
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
			msg: "Falha ao excluir o restaurante" 
		});	
	})
}

function atualizaRestaurante(req,res)
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
    salva 			: salvaRestaurante,
    exclui 			: excluiRestaurante,
	atualiza 		: atualizaRestaurante,  
}