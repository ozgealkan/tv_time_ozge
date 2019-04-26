const express = require('express');
const Sequelize = require('sequelize');

const router = express.Router();
const EpisodeService = require('../services/EpisodeService');

router.post('/tvshow/:id', (req, res) => {
  const data = {
    tvShowId: req.params.id,
    name: req.body.name,
    date: req.body.date,
    summary: req.body.summary,
    coverPhoto: req.body.cover_photo,
  };
  EpisodeService.createEpisode(data)
    .then((result) => {
      res.send({ data: result });
    });
});

router.get('/tvshow/:id', (req, res) => {
  EpisodeService.findAll({ where: { tvShowId: req.params.id } })
    .then((episodes) => {
      res.send({ data: episodes });
    });
});

router.get('/:id', (req, res) => {
  EpisodeService.getEpisodes(req.params)
    .then((episode) => {
      res.send(episode);
    });
});

router.put('/:id', (req, res) => {
  const data = {
    tvShowId: req.params.id,
    name: req.body.name,
    date: req.body.date,
    summary: req.body.summary,
    coverPhoto: req.body.cover_photo,
  };
  EpisodeService.updateEpisode(data)
    .then((episode) => {
      res.send(episode);
    });
});

router.delete('/:id', (req, res) => {
  EpisodeService.deleteEpisode(req.params)
    .then((episode) => {
      res.send(episode);
    });
});


module.exports = router;
