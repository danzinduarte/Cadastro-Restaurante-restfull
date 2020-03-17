const dataContext = require('../dao/dao');
function carregaTudo(req,res) {
	if (req.query.nomeDoPrato) {

		return dataContext.Prato.findAll({
			include : [
				{
					model : dataContext.Restaurante
				}
			]
		})
		.then(function(pratosFiltradas) {			
			res.status(200).json({
				sucesso:true,
				data: pratosFiltradas
			})
		})
		//Depois de filtras os nomes devo retornar isso
	}
	return dataContext.Prato.findAll({
	}).then(function(pratos){
		pratos = pratos.map(function(pratosRetornados){
			pratosRetornados = pratosRetornados.get({ plain : true})
			delete pratosRetornados.restauranteId
			return pratosRetornados
		})
    	return res.status(200).json(
		{
        	sucesso : true,
            data : pratos
        })
    }).catch(function(err)
	{
		return res.status(404).json(
		{ 	
			sucesso: false,
			data : [],
			erros : err
		});
	})
}

function carregaPorId(req,res) 
{
	return dataContext.Prato.findByPk(req.params.id,{
		include: [{
			model: dataContext.Restaurante
		}]
	})
	.then(function(prato){
		if (!prato) 		{
			res.status(404).json({
				sucesso: false,
				msg: "Prato não encontrado."
			})
			return;
		}
		prato = prato.get({plain : true})

		delete prato.restauranteId

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
		return res.status(400).json({
			sucesso: false, 
			msg: "Formato de entrada inválido."
		})
		
	}

	dataContext.conexao.transaction(function(t) {
		
		let dadosRestauranteCriado;

		return dataContext.Restaurante.create(restaurante, {transaction : t})
		.then(function(restauranteCriado){
			dadosRestauranteCriado = restauranteCriado
			return dadosRestauranteCriado;
		})
	})
	.then(function(novoPrato){
		res.status(201).json({
			sucesso : true,
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
	dataContext.conexao.transaction(function(t){
		
		let prato

		dataContext.Prato.findByPk(req.params.id,{transaction : t})
		.then(function(prato){
			if (!prato){
				return res.status(404).json({
					sucesso : false,
					msg: "Prato não encontrado"
				})
			}
			prato = pratoEncontrado

			pratoEncontrado.destroy({transaction : t})

			return dataContext.Restaurante.findByPk(prato.restauranteId, {transaction : t})
			.then(function ( restauranteRetornado){
				restauranteRetornado.destroy({transaction : t})
			})
		})

			//dataContext.Prato.destroy ({ where : { id : req.params.id}})
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

		pratoBanco.update(updateFields, {transaction : t})
		return dataContext.Restaurante.findByPk(prato.restauranteId, {transaction : t})
	})
	.then(function(restauranteEncontrado){
		let updateFields = {
			nomeDoRestaurante : prato.restaurante.nomeDoRestaurante
		}
		return restauranteEncontrado.update(updateFields, {transaction : t})
	})
		.then(function(pratoAtualizado){
			return res.status(200).json({
				sucesso: true,
				msg: "Prato Atualizado com Sucesso",
				data: pratoAtualizado
			})
		})
	.catch(function(error){
		return res.status(404).json({
			sucesso: false,
			msg: "Falha ao Atualizar o Prato",
			erro : error
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