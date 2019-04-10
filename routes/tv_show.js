const express = require('express');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const router = express.Router();

const { TvShow } = require('../connection');


router.post('/category/:categoryId', (req, res) => {
  const data = {
    categoryId: req.params.categoryId,
    name: req.body.name,
  };
  TvShow.create(data)
    .then((datas) => {
      res.send({ data: datas });
    });
});
router.get('/category/:categoryId', (req, res) => {
  TvShow.findAll({ where: { categoryId: req.params.categoryId } })
    .then((shows) => {
      res.send(shows);
    });
});
router.get('/:name', (req, res) => {
  const names = req.params.name;
  TvShow.findAll({
    where: { name: { [Op.like]: '%' + names + '%' } }
  })
    .then((tvName) => {
      res.send(tvName);
    });
});
router.delete('/:showId', (req, res) => {
  TvShow.destroy({ where: { id: req.params.showId } })
    .then((response) => {
      if (response !== 0) {
        res.send('success');
      }
      res.send('fail');
    });
});
router.put('/:showId', (req, res) => {
  const data = {
    name: req.body.name
  };
  TvShow.update(data, {
    where: {
      id: req.params.showId
    }
  })
    .then((response) => {
      if (!response) {
        res.send(null);
      }
      res.send({ data: response });
    });
});
module.exports = router;
