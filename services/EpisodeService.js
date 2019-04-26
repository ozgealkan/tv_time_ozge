const { EpisodeModel } = require('../connection');
const Errors = require('../errors/EpisodeErrors');

module.exports = () => {
  const EpisodeService = {};
  EpisodeService.createEpisode = (params) => {
    return new Promise((res, rej) => {
      const data = params;
      EpisodeModel.create(data)
        .then((response) => {
          if (!response) {
            throw new Errors.EpisodeCreateException();
          }
          res.send({ data: response });
        })
        .catch(rej);
    });
  };
  EpisodeService.getEpisodes = (params) => {
    return new Promise((res, rej) => {
      EpisodeModel.findAll({ where: { tvShowId: params.id } })
        .then((episodes) => {
          if (!episodes) {
            throw new Errors.EpisodeNotFound();
          }
          res.send({ data: episodes });
        })
        .catch(rej);
    });
  };

  EpisodeService.getEpisodes = (params) => {
    return new Promise((res, rej) => {
      EpisodeModel.findAll({ where: { id: params.id } })
        .then((episodes) => {
          if (!episodes) {
            throw new Errors.EpisodeNotFound();
          }
          res.send({ data: episodes });
        })
        .catch(rej);
    });
  };

  EpisodeService.updateEpisode = (params) => {
    return new Promise((res, rej) => {
      const data = params;
      EpisodeModel.update(data, { where: { id: params.id } })
        .then((episode) => {
          if (!episode.affectedRowCount) {
            throw new Errors.EpisodeUpdateException();
          }
          res.send(data);
        })
        .catch(rej);
    });
  };

  EpisodeService.deleteEpisode = (params) => {
    return new Promise((res, rej) => {
      EpisodeModel.destroy({ where: { id: params.categoryId } })
        .then((response) => {
          if (!response.affectedRowCount) {
            throw new Errors.EpisodeDeleteException();
          }
          res.send({ data: response });
        })
        .catch(rej);
    });
  };
};
