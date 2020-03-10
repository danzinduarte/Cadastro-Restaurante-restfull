/*
O propósito de "use strict" é indicar que o código deve ser executado em "modo estrito".
Com o modo estrito, você não pode, por exemplo, usar variáveis ​​não declaradas.
*/
'use strict';

//Sequelize = ORM banco relacional
//Modelos são definidos com sequelize.define('name', {attributes}, {options}).
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Restaurante', {
        id: {
            type: DataTypes.INTEGER,
            field: 'Id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: 'Chave primaria'
        },
        NomeDoRestaurante: {
            type: DataTypes.STRING(80),
            field: 'restaurante',
            allowNull: false,
            comment: 'Nome do restaurante'
        }
        
    }, {
        //schema: 'public',
        tableName: 'Restaurante',
        timestamps: false,
        name:{
            singular:'restaurante',
            plural  :'restaurantes'
        }
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; 
};

