module.exports = (sequelize, types) => {
    return sequelize.define('profile', {
        id: {
            type: types.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: types.INTEGER
        },
        my_tvshows_episodes: {
            type: types.INTEGER
        },
        my_favorites: {
            type: types.BOOLEAN
        },
        type: {
            type: types.ENUM('Tvshow', 'Episode')
        }
    },
  {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  })
}