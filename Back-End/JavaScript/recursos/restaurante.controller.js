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
					msg: "Restaurantes não encontrados.",
					erros : restaurante
				})
				return;
			}

			res.status(200).json({
				sucesso: true,
				data: restaurante
			})
		})
	
} 

function salvaRestaurante(req,res){
    
    let restaurante = req.body

	if (!restaurante) {
		res.status(400).json({
			sucesso: false, 
			msg: "Formato de entrada inválido.",
		})
		return;
    }	
    
	//Criar um novo objeto Visita no banco de dados com os dados passados pelo formulário
	dataContext.Restaurante.create(restaurante)

	//Cria uma promise que retorna o JSON
    .then(function(novoRestaurante){
        res.status(201).json({
            sucesso : true,
            data : novoRestaurante
        })
	})
	
	//Caso haja uma exceção
    .catch(function(err){
        res.status(404).json({ 
            sucesso: false,
			msg: "Falha ao incluir o Restaurante" ,
			erros : err
        })
    })
}
function excluiRestaurante(req,res)
{
	if (!req.params.id) {
		return res.status(400).json({
			sucesso: false,
			msg: "Formato de entrada inválido."
		});
	}

	// Quando tu for trabalhar com apenas um model e que ele nao vai fazer outras insercoes em outras tabelas, vc nao precisa utilizar transacao
	dataContext.Restaurante.findByPk(req.params.id).then( function(restaurante){
		
		if (!restaurante) {
			return res.status(404).json({
				sucesso: false,
				msg: "Restaurante não encontrado."
			})
		}

		//restaurante = restaurante.get({ plain : true })
		dataContext.Restaurante.destroy({ where : { id : req.params.id }})
		.then(function(result) {
			return res.status(200).json({
				sucesso: true,
				msg: 'Restaurante excluido com sucesso!'
			})
		})

	}).catch(function(error){
		return res.status(400).json({ 
			sucesso: false,
			msg: "Falha ao excluir o restaurante",
			erro: error 
		});	
	})
}

function atualizaRestaurante(req,res){
	
	//No front devo retornar um objeto restaurante com os dados
	let restaurante	= req.body

	if (!restaurante) {
		return res.status(400).json({
			sucesso: false,
			msg: "Formato de entrada inválido."
		})		
	}

	if(!req.params.id) {
		return res.status(400).json({
			sucesso: false,
			msg: "Um id deve ser informado!"
		})
	}

	dataContext.Restaurante.findByPk(req.params.id)
	.then(function(restauranteBanco){
		if (!restauranteBanco) {
			return res.status(404).json({
				sucesso: false,
				msg: "Restaurante não encontrado."				
			});
		}

		// Campos da restaurante que serão alterados
		let updateFields = {
			nomeDoRestaurante			: restaurante.nomeDoRestaurante
		}

		// Atualiza somente os campos restaurante
		restauranteBanco.update(updateFields).then(function(restauranteAtualizado){
			return res.status(200).json({
				sucesso:true,
				msg: "Registro atualizado com sucesso",
				data: restauranteAtualizado
			})	
		})

	}).catch(function(error){
		return res.status(400).json({ 
			sucesso: false,
			msg: "Falha ao atualizar o restaurante" 
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