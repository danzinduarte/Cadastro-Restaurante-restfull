//Express é o servidor HTTP
let rota = require('express').Router();


//definindo controllers
//Prato
let pratoController = require('../recursos/prato.controller');

//Restaurante
let restauranteController = require('../recursos/restaurante.controller');


//Definindo as rotas 
//Prato
rota.get('/prato', pratoController.carregaTudo);
rota.get('/prato/:id', pratoController.carregaPorId);
rota.post('/prato', pratoController.salva);
rota.delete('/prato/:id', pratoController.exclui);
rota.put('/prato/:id', pratoController.atualiza);

//Usuário
rota.get('/restaurante', restauranteController.carregaTudo);
rota.get('/restaurante/:id', restauranteController.carregaPorId);
rota.post('/restaurante', restauranteController.salva);
rota.delete('/restaurante/:id', restauranteController.exclui);
rota.put('/restaurante/:id', restauranteController.atualiza);

//Torna todas as rotas públicas
module.exports = rota;