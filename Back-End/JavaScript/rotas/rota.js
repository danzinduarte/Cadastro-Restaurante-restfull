//Express é o servidor HTTP
let rota = require('express').Router();


//definindo controllers
//Prato
let pratoController = require('../recursos/prato.controller');

//Restaurante
let restauranteController = require('../recursos/restaurante.controller');


//Definindo as rotas 
//Prato
rota.get('/pratos', pratoController.carregaTudo);
rota.get('/pratso/:id', pratoController.carregaPorId);
rota.post('/pratos', pratoController.salva);
rota.delete('/pratos/:id', pratoController.exclui);
rota.put('/pratos/:id', pratoController.atualiza);

//Usuário
rota.get('/restaurantes', restauranteController.carregaTudo);
rota.get('/restaurantes/:id', restauranteController.carregaPorId);
rota.post('/restaurantes', restauranteController.salva);
rota.delete('/restaurantes/:id', restauranteController.exclui);
rota.put('/restaurantes/:id', restauranteController.atualiza);

//Torna todas as rotas públicas
module.exports = rota;