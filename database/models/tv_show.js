module.exports = (sequelize, types) => {
  return sequelize.define('tv_show', {
    id: {
      type: types.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: types.STRING,
    },
    categoryId: {
      type: types.INTEGER,
    },
  },
  {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  });
};
