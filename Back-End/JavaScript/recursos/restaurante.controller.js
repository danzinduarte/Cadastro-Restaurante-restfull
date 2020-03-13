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
		res.status(404).json({
			sucesso: false, 
			msg: "Formato de entrada inválido.",
			erro : req.body
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
        res.status(409).json({ 
            sucesso: false,
			msg: "Falha ao incluir a visita" ,
			erros : err
        })
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
			
			return dataContext.Restaurante.findByPk(id, {transaction : t})
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

function atualizaRestaurante(req,res){
	
	//No front devo retornar um objeto restaurante com os dados
	let restaurante	= req.body

	if (!restaurante) {
		res.status(404).json({
			sucesso: false,
			msg: "Formato de entrada inválido.",
			erro : req.body
		})
		return;
	}

	//Inicia transaction
	dataContext.conexao.transaction(function(t) {

		//Pesquise antes de atualizar
		dataContext.Restaurante.findByPk(req.params.id, {transaction : t})
		
		.then(function(restaurante){
			if (!restaurante) {
				res.status(404).json({
					sucesso: false,
					msg: "Restaurante não encontrado.",
					erro : restaurante
				})
				return;
			}
			
			//Campos da restaurante que serão alterados
			let updateFields = {
				nomeDoRestaurante			: restaurante.nomeDoRestaurante
			}

			//Atualiza somente os campos restaurante
			restaurante.update(updateFields, {transaction : t})
		})
	}).then(function(restauranteAtualizado) {	
		res.status(200).json({
        sucesso:true,
        msg: "Registro atualizado com sucesso",
        data: restauranteAtualizado
        	})	
	})
	//Roolback
	.catch(function(erro){
		console.log(erro);
		res.status(409).json({ 
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