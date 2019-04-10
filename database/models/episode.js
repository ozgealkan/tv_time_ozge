module.exports = (sequelize, types) => {
  return sequelize.define('episode', {
    id: {
      type: types.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: types.STRING,
    },
    date: {
      type: types.DATE,
    },
    summary: {
      type: types.TEXT,
    },
    cover_photo: {
      type: types.BLOB,
    },
  },
  {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  });
};
