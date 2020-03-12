
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
            type: DataTypes.INTEGER,
            field: 'Preco',
            allowNull: false,
            comment: 'preco do prato'
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
};

