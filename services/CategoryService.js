const Sequelize = require('sequelize');
const Errors = require('../errors/EpisodeErrors');

const Op = Sequelize.Op;
const { CategoryModel } = require('../connection');
const { TvShowModel } = require('../connection');

module.exports = () => {
  const CategoryService = {};
  CategoryService.createCategory = (params) => {
    return new Promise((res, rej) => {
      const data = params;
      CategoryModel.create(data)
        .then((result) => {
          res.send({ data: result });
        })
        .catch(rej);
    });
  };

  CategoryService.getCategoryName = (params) => {
    return new Promise((res, rej) => {
      const name = params.categoryname;
      CategoryService.findAll({
        where: { name: { [Op.like]: name + '%' } }
      })
        .then((result) => {
          res.send({ data: result });
        })
        .catch(rej);
    });
  };

  CategoryService.getCategories = () => {
    return new Promise((res, rej) => {
      CategoryService.findAll()
        .then((categories) => {
          if (!categories) {
            throw new Error.CategoryNotFound();
          }
          res.send({ data: categories });
        })
        .catch(rej);
    });
  };

  CategoryService.getCategoriesTv = (params) => {
    return new Promise((res, rej) => {
      CategoryService.findAndCountAll({
        where: { id: params.id },
        include: [{
          where: { categoryId: 3 },
          model: TvShowModel,
          as: 'tvid',
        }],
      })
        .then((result) => {
          res.send({ data: result });
        })
        .catch(rej);
    });
  };
  CategoryService.deleteCategories = (params) => {
    return new Promise((res, rej) => {
      CategoryService.destroy({ where: { id: params.categoryId } })
        .then((response) => {
          if (!response.affectedRowCount) {
            throw new Errors.CategoryDeleteException();
          }
          res.send({ data: response });
        })
        .catch(rej);
    });
  };
  CategoryService.updateCategories = (data, params) => {
    return new Promise((res, rej) => {
      CategoryService.update(data, { where: { id: params.categoryId } })
        .then((datas) => {
          if (!datas.affectedRowCount) {
            throw new Errors.CategoryUpdateException();
          }
          res.send(datas);
        })
        .catch(rej);
    });
  };
  return CategoryService;
};
