const Category= require('./Category');
const Product= require('./Product');
const Tag= require('./Tag');
const ProductTag= require('./ProductTag');

Product.belongsTo(Category);
Category.hasMany(Product);

Product.belongsTo(Tag,{
    foreignKey: 'product_id',
    foreignKey: 'tag_id',
});

Tag.belongsTo(Product,{
    foreignKey: 'product_id',
    foreignKey: 'tag_id', 
});

module.exports= {
    Category,
    Product,
    Tag, 
    ProductTag,
};