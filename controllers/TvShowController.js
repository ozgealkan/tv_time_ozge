const express = require('express');
const Sequelize = require('sequelize');

const router = express.Router();
const TvShowService = require('../services/TvShowService');


router.post('/category/:categoryId', (req, res) => {
  const data = {
    categoryId: req.params.categoryId,
    name: req.body.name,
  };
  TvShowService.createTvshow(data)
    .then((datas) => {
      res.send({ data: datas });
    });
});

router.get('/category/:categoryId', (req, res) => {
  TvShowService.findAll({ where: { categoryId: req.params.categoryId } })
    .then((shows) => {
      res.send(shows);
    });
});

router.get('/:name', (req, res) => {
  const names = req.params.name;
  TvShowService.getTvShowsByName(names)
    .then((shows) => {
      res.send(shows);
    });
});

router.delete('/:showId', (req, res) => {
  TvShowService.deleteTvShow(req.params)
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
  TvShowService.updateTvShow(data, req.params)
    .then((response) => {
      if (!response) {
        res.send(null);
      }
      res.send({ data: response });
    });
});

module.exports = router;
