'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Restaurantes', {
        id: {
            type: DataTypes.INTEGER,
            field: 'Id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: 'Chave primaria'
        },
        nomeDoRestaurante: {
            type: DataTypes.STRING(80),
            field: 'NomeDoRestaurante',
            allowNull: false,
            comment: 'Nome do restaurante'
        }   
    }, 
    {
        schema: 'public',
        tableName: 'Restaurantes',
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

