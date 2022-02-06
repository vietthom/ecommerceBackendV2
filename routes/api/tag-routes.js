const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const getTags= await Tag.findAll({
      include:[
        {model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']}
      ]
    });
    res.status(200).json(getTags);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const getTagById= await Tag.findByPk(req.params.id, 
      {
      include: [
        {model: Product, 
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'] }
      ]
    });
    res.status(200).json(getTagById);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag= await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    await Tag.update(req.body,
      {
      where: {
        id: req.params.id,
      },
    });
    const updateTag= await Tag.findByPk(req.params.id);
    res.status(200).json(updateTag);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.findByPk(req.params.id);
    await Tag.destroy({
      where:{
        id: req.params.id,
      }
    });
    res.status(200).json(deleteTag);
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;