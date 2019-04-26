const Sequelize = require('sequelize');
const Errors = require('../errors/TvshowErrors');

const Op = Sequelize.Op;
const { TvShowModel } = require('../connection');

module.exports = () => {
  const TvShowService = {};
  TvShowService.createTvshow = (params) => {
    return new Promise((res, rej) => {
      const data = params;
      TvShowModel.create(data)
        .then((result) => {
          res.send({ data: result });
        })
        .catch(rej);
    });
  };

  TvShowService.getTvShows = (params) => {
    return new Promise((res, rej) => {
      TvShowService.findAll({ where: { categoryId: params.categoryId } })
        .then((result) => {
          res.send({ data: result });
        })
        .catch(rej);
    });
  };

  TvShowService.getTvShowsByName = (params) => {
    return new Promise((res, rej) => {
      TvShowService.findAll({
        where: { name: { [Op.like]: '%' + params + '%' } }
      })
        .then((tvName) => {
          res.send(tvName);
        })
        .catch(rej);
    });
  };

  TvShowService.deleteTvShow = (params) => {
    return new Promise((res, rej) => {
      TvShowService.destroy({ where: { id: params.showId } })
        .then((result) => {
          res.send({ data: result });
        })
        .catch(rej);
    });
  };

  TvShowService.updateTvShow = (data, params) => {
    return new Promise((res, rej) => {
      TvShowService.update(data, {
        where: {
          id: params.showId
        }
      })
        .then((datas) => {
          if (!datas.affectedRowCount) {
            throw new Errors.TvShowUpdateException();
          }
          res.send(datas);
        })
        .catch(rej);
    });
  };

  return TvShowService;
};
