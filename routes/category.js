const express = require('express');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const router = express.Router();
const Errors = require('../errors/CategoryErrors')

const { Category } = require('../connection');
const { TvShow } = require('../connection');

router.post('/', (req, res) => {
  Category.create(req.body)
    .then((name) => {
      if (!name) {
        throw new Error.CategoryCreateException();
      }
      res.send({ data: name });
    })
    .catch();
});
router.get('/:categoryname', (req, res) => {
  const name = req.params.categoryname;
  Category.findAll({
    where: { name: { [Op.like]: name + '%' } }
  })
    .then((names) => {
      if (!names) {
        throw new Error.CategoryNotFound();
      }
      res.send({ data: names });
    });
});
router.get('/', (req, res) => {
  Category.findAll()
    .then((categories) => {
      if (!categories) {
        throw new Error.CategoryNotFound();
      }
      res.send({ data: categories });
    });
});
router.get('/:id/tvshows', (req, res) => {
  Category.findAndCountAll({
    where: { id: req.params.id },
    include: [{
      where: { categoryId: 3 },
      model: TvShow,
      as: 'tvid',
    }],
  })
    .then((categories) => {
      res.send(categories);
    });
});
router.delete('/:categoryId', (req, res) => {
  Category.destroy({ where: { id: req.params.categoryId } })
    .then((response) => {
      if (!response.affectedRowCount) {
        throw new Errors.CategoryDeleteException();
      }
      res.send({ data: response });
    });
});
router.put('/:categoryId', (req, res) => {
  const data = {
    name: req.body.name,
  };
  Category.update(data, { where: { id: req.params.categoryId } })
    .then((datas) => {
      if (!datas.affectedRowCount) {
        throw new Errors.CategoryUpdateException();
      }
      res.send(datas);
    })
    .catch();
});

module.exports = router;