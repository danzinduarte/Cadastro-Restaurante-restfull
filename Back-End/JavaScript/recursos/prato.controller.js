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
		res.status(400).json(
		{
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


function excluiPrato(req,res)
{
	if (!req.params.id){
		return res.status(400).json({
			sucesso: false,
			msg: "Formato de entrada inválido."
		})
	}

	dataContext.findByPk(req.params.id).then(function(prato){
		if (!prato){
			return res.status(404).json({
				sucesso : false,
				msg: "Prato não encontrado"
			})
		}

		dataContext.Restaurante.destroy ({ where : { id : req.params.id}}).then(function(result){
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
})}

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