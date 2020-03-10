'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Restaurante', {
        Id: {
            type: DataTypes.INTEGER,
            field: 'id',
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
        schema: 'public',
        tableName: 'restaurante',
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

