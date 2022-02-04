const Category= require('./Category');
const Product= require('./Product');
const Tag= require('./Tag');
const ProductTag= require('./ProductTag');

Product.belongsTo(Category,{
    foreignKey: 'category_id',
});

Category.hasMany(Product,{
    foreignKey:'category_id',
    onDelete: 'SET NULL'
});

Product.belongsTo(Tag,{
    through: ProductTag,
    foreignKey:'product_id',
});

Tag.belongsTo(Product,{
    through: ProductTag,
    foreignKey:'tag_id',
});

module.exports= {
    Category,
    Product,
    Tag, 
    ProductTag,
};