const router = require('express').Router();
const res = require('express/lib/response');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (e) {
        res.json(e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const categories = await Category.findByPk(req.params.id);
        res.json(categories);
    } catch (e) {
        res.json(e);
    }
});

router.post('/', async (req, res) => {
  // create a new category
  const {category_name} = req.body;
  try {
    const newCategory= await Category.create({
      category_name,
    });
    res.json(newCategory);
  } catch (e) {
    res.json(e);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const {id, category_name}=req.body;
  try {
    await Category.update({
      id, category_name,
    },
    {
      where: { 
        id: req.params.id,
      }
    });
    const updateCategory = await Category.findByPk(req.params.id);
    res.json(updateCategory);
  } catch (e) {
    res.json(e);
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
    res.json(deleteCategory);
  } catch (e) {
    res.json(e);
  }
});

module.exports = router;