module.exports = (sequelize, types) => {
  return sequelize.define('user', {
    id: {
      type: types.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: types.STRING,
    },
    lastName: {
      type: types.STRING,
    },
    email: {
      type: types.STRING,
      unique: true,
      allowNull: false,
    },
    username: {
      type: types.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: types.STRING,
      allowNull: false,
    },
    type: {
      type: types.ENUM('admin', 'user'),
      defaultValue: 'user',
    },
  },
    {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    });
};
