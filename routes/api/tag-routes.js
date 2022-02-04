const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const getTags= await Tag.findAll({
      include:[{model: Product, ProductTag}]
    });
    res.json(getTags);
  } catch (e) {
    res.json(e)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const getTagById= await Tag.findByPk(req.params.id, {
      include: [{model: Product, Tag }]
    });
    res.json(getTagById);
  } catch (e) {
    res.json(e);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  const {id, tag_name} = req.body;
  try {
    const newTag= await Tag.create({
      id,
      tag_name,
    });
    res.json(newTag);
  } catch (e) {
    res.json(e);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const {id, tag_name,}= req.body;
  try {
    await Tag.update({
      id, tag_name,
    },{
      where: {
        id: req.params.id,
      },
    });
    const updateTag= await Tag.findByPk(req.params.id);
    res.json(updateTag);
  } catch (e) {
    res.json(e);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.findByPk(req.params.id);
    await Tag.destroy({
      where:{
        id: req.param.id,
      }
    });
    res.json(deleteTag);
  } catch (e) {
    res.json(e);
  }
});

module.exports = router;