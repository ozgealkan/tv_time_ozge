const express = require('express');
const Sequelize = require('sequelize');

const router = express.Router();
const CategoryService = require('../services/CategoryService');

router.post('/', (req, res, next) => {
  const data = {
    name: req.body.name,
  };
  CategoryService
    .postReview(data)
    .then((category) => {
      return (res, category);
    })
    .catch((err) => {
      return (next, err);
    });
});

router.get('/:categoryname', (req, res) => {
  const name = req.params.categoryname;
  CategoryService
    .getCategoryName(name)
    .then((names) => {
      res.send({ data: names });
    });
});

router.get('/', (req, res) => {
  CategoryService.getCategories(req.params)
    .then((categories) => {
      res.send({ data: categories });
    });
});

router.get('/:id/tvshows', (req, res) => {
  CategoryService.getCategoriesTv(req.params)
    .then((categories) => {
      res.send(categories);
    });
});

router.delete('/:categoryId', (req, res) => {
  CategoryService.deleteCategories
    .then((response) => {
      res.send({ data: response });
    });
});
router.put('/:categoryId', (req, res) => {
  const data = {
    name: req.body.name,
  };
  CategoryService.updateCategories(data, { where: { id: req.params.categoryId } })
    .then((datas) => {
      res.send(datas);
    })
    .catch();
});

module.exports = router;
