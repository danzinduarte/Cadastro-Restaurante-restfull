
'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Prato', {
        id: {
            type: DataTypes.INTEGER,
            field: 'Id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: 'Chave primaria'
        },        
        nomeDoPrato: {
            type: DataTypes.STRING(60),
            field: 'NomeDoPrato',
            allowNull: false,
            comment: 'Nome do prato',
            
        },
        preco: {
            type: DataTypes.STRING(60),
            field: 'Preco',
            allowNull: false,
            comment: 'preco do prato'
        },
        restauranteId: {
            type: DataTypes.INTEGER,
            field: 'RestauranteId',
            allowNull: false,
            comment: 'chave estrangeira de restaurante'
        }
    }, 
    {
        schema: 'public',
        tableName: 'Pratos',
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
        foreignKey: 'restauranteId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
};

