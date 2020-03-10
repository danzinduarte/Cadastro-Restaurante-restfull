/*
O propósito de "use strict" é indicar que o código deve ser executado em "modo estrito".
Com o modo estrito, você não pode, por exemplo, usar variáveis ​​não declaradas.
*/
'use strict';

//Sequelize = ORM banco relacional
//Modelos são definidos com sequelize.define('name', {attributes}, {options}).
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Prato', {
        Id: {
            type: DataTypes.INTEGER,
            field: 'Id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: 'Chave primaria'
        },        
        NomeDoPrato: {
            type: DataTypes.STRING(60),
            field: 'nome do prato',
            allowNull: false,
            comment: 'Nome do prato',
            
        },
        Preco: {
            type: DataTypes.BIGINT,
            field: 'preco',
            allowNull: false,
            comment: 'preco do prato'
        },
        restauranteId: {
            type: DataTypes.INTEGER,
            field: 'restaurante_id',
            allowNull: false,
            comment: 'Chave estrangeira Restaurante',
        },

    }, {
        //schema: 'public',
        tableName: 'prato',
        timestamps: false,
        name:{
            singular:'prato',
            plural  :'pratos'
        }
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations;

    
    var dataContext         = require('../dao');
    var Prato               = dataContext.Prato;
    var Restaurante         = dataContext.Restaurante;
 

    Prato.belongsTo(Restaurante, {
        foreignKey: 'restaurante_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
};

