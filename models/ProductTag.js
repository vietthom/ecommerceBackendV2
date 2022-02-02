const {Model, DataTypes}= require('sequelize');
const sequelize = require('../config');

class ProductTag extends Model {}

ProductTag.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        product_id:{
            type: DataTypes.INTEGER,
            reference:{
                model: 'Product',
                key: 'id',
            },
        },
        tag_id:{
            type: DataTypes.INTEGER,
            reference:{
                type: DataTypes.INTEGER,
                reference: {
                    model: 'Tag',
                    key: 'id',
                },
            },
        },
    },
    {
sequelize,
timestamps: false,
freezeTableName: true,
underscored: true,
modelName: 'ProductTag',
    },
);

module.exports = ProductTag;