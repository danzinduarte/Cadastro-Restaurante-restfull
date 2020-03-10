const dataContext = require('../dao/dao'),

function carregaTudo(req,res) 
{
	if (req.query.prato) 
	{
		return dataContext.Prato.findAll({
			where :
			{
				Id : req.query.prato
			},
			order : 'id'
		}).then(function(pratos)
		{
			pratos = pratos.map(function(pratosRetornados) 
			{
				pratosRetornados = pratosRetornados.get({plain : true})
				delete visitasRetornadas.restaurante_id
				return pratosRetornados
			})	
			res.status(200).json(
			{
				sucesso:true,
				data: pratos
			})
		})
	}
}

function carregaPorId(req,res) 
{
	return dataContext.Prato.findById(req.params.id,
	{
		include: 
		[{
				model: dataContext.Restaurante,
		}]

	}).then(function(prato)
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

		prato = prato.get({plain : true})

		delete prato.restaurante_id

        res.status(200).json({
			sucesso: true,
			data: prato
		})
    })
} 

function salvaprato(req,res){

	let prato = req.body.prato,

	restaurante = {
			restaurante  : prato.restaurante,
		}

	if (!prato) {
		res.status(404).json({
			sucesso: false, 
			msg: "Formato de entrada inválido."
		})
		return;
	}


	dataContext.conexao.transaction(function(t) {

		let dadosRestauranteCriado

		return dataContext.Restaurante.create(restaurante, {transaction : t})
			.then(function(restauranteCriado) {
				dadosRestauranteCriado = restauranteCriado

				return dataContext.Prato.create({
					nomeDoPrato			: prato.nomeDoPrato,
					preco 				: prato.preco,
					restauranteId		: dadosRestauranteCriado.id
				}, {transaction : t})
			})
	})
	.then(function(novoPrato){
		res.status(201).json({
			sucesso: true, 
			data: novoPrato
		})
	})
	.catch(function(erro){
		console.log(erro);
		res.status(409).json({ 
			sucesso: false,
			msg: "Falha ao incluir o novo prato" 
		});
	})
}

function excluiPrato(req,res){
	if (!req.params.id) {
		res.status(409).json({
			sucesso: false,
			msg: "Formato de entrada inválido."
		})
		return;
	}

	dataContext.conexao.transaction(function(t) {

		let prato
		dataContext.Prato.findById(req.params.id, {transaction : t})
		
		.then(function(pratoEncontrado){
			
			if (!pratoEncontrado) {
				res.status(404).json({
					sucesso: false,
					msg: "Prato não encontrado."
				})
				return;
			}

			prato = pratoEncontrada
			pratoEncontrada.destroy({transaction : t})
			return dataContext.Restaurante.findById(prato.restauranteId, {transaction : t})
		})
		.then(function(restauranteRetornado) {

			restauranteRetornado.destroy({transaction : t})
		})
	})
	.then(function(){
			res.status(200).json({
        		sucesso:true,
        		msg: "Registro excluído com sucesso",
        		data: []
        	})	        	
		})
	.catch(function(erro){
		res.status(409).json({ 
			sucesso: false,
			msg: "Falha ao excluir o prato" 
		});	
	})
}

function atualizaPrato(req,res){
	
	if (!req.params.id) {
		res.status(409).json({
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
		.then(function(prato){
			if (!prato) {
				res.status(404).json({
					sucesso: false,
					msg: "Prato não encontrado."
				})
				return;
			}
			
			let updateFields = {
				nomeDoPrato					: pratoForm.nome,
				preco						: pratoForm.preco
			}

			prato.update(updateFields, {transaction : t})
			return dataContext.Restaurante.findById(prato.restauranteId, {transaction : t})
		})
		.then(function(enderecoEncontrado){
			let updateFields = {
				logradouro 			: pessoaForm.endereco.logradouro,
				numero 				: pessoaForm.endereco.numero,
				bairro 				: pessoaForm.endereco.bairro,
				cidade 				: pessoaForm.endereco.cidade,
				uf 					: pessoaForm.endereco.uf
			}

			//Atualiza somente os campos Endereço
			return enderecoEncontrado.update(updateFields, {transaction : t})

		})	
	})
	//Commit
	.then(function(pessoaAtualizada) {	
		res.status(200).json({
        sucesso:true,
        msg: "Registro atualizado com sucesso",
        data: pessoaAtualizada
        	})	
	})
	//Roolback
	.catch(function(erro){
		console.log(erro);
		res.status(409).json({ 
			sucesso: false,
			msg: "Falha ao atualizar a pessoa" 
		});	
	})
}

module.exports = {
	//Quando for consumir irá pegar os nomes da primeira tabela
    carregaTudo  	: carregaTudo,
    carregaPorId 	: carregaPorId,
    salva 			: salvaPessoa,
    exclui 			: excluiPessoa,
	atualiza 		: atualizaPessoa,  
}