
'use strict';

var pg = require('pg');
let Sequelize   = require('sequelize'),
conexao     = new Sequelize('CadastroDeRestaurante', 'postgres', '1234',

    {
        host: '127.0.0.1',
        port:5432,          
        dialect: 'postgres',
        logging: false,     
        isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED 
    });

var types = {
    FLOAT4: 700,
    FLOAT8: 701,
    NUMERIC: 1700,
    FLOAT4_ARRAY: 1021,
    FLOAT8_ARRAY: 1022,
    NUMERIC_ARRAY: 1231
},

formataFloat = function fnFormataFloat(valor) {
    if(/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(valor))
        return Number(valor);
    return 0;
}

pg.types.setTypeParser(types.FLOAT4, 'text', formataFloat);
pg.types.setTypeParser(types.FLOAT8, 'text', formataFloat);
pg.types.setTypeParser(types.NUMERIC, 'text', formataFloat);

/// Instancias dos modelos
var model = {};
var initialized = false;

function init() {
    delete module.exports.init;     
    initialized = true;
    
	// Modelos
   
    model.Prato                = conexao.import('./modelo/prato.js');
    model.Restaurante          = conexao.import('./modelo/restaurante.js');
   
    
    // Arquivos
    
    require('./modelo/prato.js').initRelations();
    require('./modelo/restaurante.js').initRelations();
   

    return model;
}

model.Sequelize = Sequelize;
model.conexao   = conexao;

module.exports = model;
module.exports.init = init;
module.exports.isInitialized = initialized;