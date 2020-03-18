const dataContext = require('../dao/dao');
function carregaTudo(req,res) {
	if (req.query) {
		return dataContext.Prato.findAll({
			attributes: { exclude: ['restauranteId', 'RestauranteId	']},
			include : [
				{
					model : dataContext.Restaurante
					 
				}
			]
		})
		.then(function(pratosFiltrados) {			
			res.status(200).json({
				sucesso:true,
				data: pratosFiltrados
			})
		})
		
	}
	return dataContext.Prato.findAll({
	}).then(function(pratos){
		pratos = pratos.map(function(pratosRetornados){
			pratosRetornados = pratosRetornados.get({ plain : true})
			
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
		attributes: { exclude: ['RestauranteId']},
		include: [{
			model: dataContext.Restaurante
		}]
	})
	.then(function(prato){
		if (!prato){
			res.status(404).json({
				sucesso: false,
				msg: "Prato não encontrado."
			})
			return;
		}
		prato = prato.get({plain : true})
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

	dataContext.Prato.create(prato)
		.then((prato) => {
			return res.status(201).json({
				success : true,
				data : prato,
				msg : 'Prato criado com sucesso'
			})
		})
		.catch((err) => {
			console.log(err)
			return res.status(400).json({
				success : false,
				msg : 'Houve um erro ao incluir o prato'
			})
		})
}


function excluiPrato(req,res)
{
	if (!req.params.id){
		return res.status(400).json({
			sucesso: false,
			msg: "Formato de entrada inválido."
		})
	}

	dataContext.Prato.findByPk(req.params.id)
	.then(function (prato){
		if (!prato){
			return res.status(404).json({
				sucesso: false,
				msg: "Prato não encontrado."
			})
		}
		dataContext.Prato.destroy({ where : { id : req.params.id }})
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
			preco 		: prato.preco,
			restauranteId : prato.restauranteId
		}
		pratoBanco.update(updateFields)
	})
	.then(function(pratoAtualizado){
		return res.status(200).json({
			sucesso: true,
			msg: "Prato Atualizado com Sucesso",
			data: pratoAtualizado
		})
	}).catch(function(error){
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