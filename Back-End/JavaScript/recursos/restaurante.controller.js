const dataContext = require('../dao/dao');

function carregaTudo(req,res){
		return dataContext.Restaurante.findAll({
		}).then(function(restaurante){
    	res.status(200).json(
		{
        	sucesso : true,
            data : restaurante
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

function carregaPorId(req,res){
	
	return dataContext.Restaurante.findByPk(req.params.id)
		.then(function(restaurante) {
			if (!restaurante) {
				res.status(404).json({
					sucesso: false,
					msg: "Restaurantes não encontrados."
				})
				return;
			}

			res.status(200).json({
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


	dataContext.conexao.transaction(function(t) {
		return dataContext.Restaurante.create({
			nomeDoRestaurante : restaurante.nomeDoRestaurante
		}, {transaction : t})
	})
	//Commit
	.then(function(restaurante){
		res.status(201).json({
			sucesso: true, 
			data: restaurante
		})
	})
	.catch(function(erro){
		console.log(erro);
		res.status(409).json({ 
			sucesso: false,
			msg: "Falha ao incluir a nova pessoa" 
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
		dataContext.Restaurante.findByPk(req.params.id, {transaction : t})
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