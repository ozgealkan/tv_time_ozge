const express = require('express');
const Sequelize = require('sequelize');
const { Episode } = require('../connection');
const Errors = require('../errors/EpisodeErrors');

const router = express.Router();
router.post('/tvshow/:id', (req, res) => {
  const data = {
    tvShowId: req.params.id,
    name: req.body.name,
    date: req.body.date,
    summary: req.body.summary,
    coverPhoto: req.body.cover_photo,
  }
  Episode.create(data)
    .then((response) => {
      if (!response) {
        throw new Errors.EpisodeCreateException();
      }
      res.send({ data: response });
    });
});

router.get('/tvshow/:id', (req, res) => {
  Episode.findAll({ where: { tvShowId: req.params.id } })
    .then((episodes) => {
      if (!episodes) {
        throw new Errors.EpisodeNotFound();
      }
      res.send({ data: episodes });
    });
});

router.get('/:id', (req, res) => {
  Episode.findOne({ where: { id: req.params.id } })
    .then((episode) => {
      if (!episode) {
        throw new Errors.EpisodeNotFound();
      }
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
  Episode.update(data, { where: { id: req.params.id } })
    .then((episode) => {
      if (!episode.affectedRowCount) {
        throw new Errors.EpisodeUpdateException();
      }
      res.send(data);
    });
});

router.delete('/:id', (req, res) => {
  Episode.destroy({ where: { id: req.params.id } })
    .then((episode) => {
      if (!episode.affectedRowCount) {
        throw new Errors.EpisodeDeleteException();
      }
      res.send('affectedRowCount=' + episode);
    });
});
module.exports = router;
