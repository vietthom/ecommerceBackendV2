const router = require('express').Router();
const res = require('express/lib/response');
const { Category, Product } = require('../../models');
// The `/api/categories` endpoint

router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll(req.body, {
          include: [
            {model: Product, 
              attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
            }]
        });
        res.status(200).json(categories);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const categories = await Category.findByPk(req.params.id, 
          {include: 
            [
              {model: Product, 
                attribute: ['id', 'product_name', 'price', 'stock']
              }
            ]
          }
          );
        res.status(200).json(categories);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory= await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    await Category.update(req.body,
    {
      where: { 
        id: req.params.id,
      }
    });
    const updateCategory = await Category.findByPk(req.params.id);
    res.status(200).json(updateCategory);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.findByPk(req.params.id);
    await Category.destroy({
      where:{
        id: req.params.id,
      }
    });
    res.status(204).json(deleteCategory);
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;