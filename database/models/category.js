module.exports = (sequelize, types) => {
  return sequelize.define('category', {
    id: {
      type: types.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: types.STRING,
    },
  },
    {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at'
    });
};
