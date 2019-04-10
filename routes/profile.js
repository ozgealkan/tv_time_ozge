const express = require('express');
const Sequelize = require('sequelize');

const router = express.Router();

const { Profile } = require('../connection');

router.post('/:userId', function (req, res, next) {
  const data = {
    myTvshowsEpisodes: req.body.myTvshowsEpisodes,
    myFavorites: req.body.myFavorites,
    type: 'Tvshow',
    userId:req.params.userId
  };
  Profile.create(data)
    .then((profile) => {
      res.send({ data: profile });
    });
});
module.exports = router;