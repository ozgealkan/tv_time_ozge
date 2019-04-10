const Sequelize = require('sequelize');

const CategoryModel = require('./database/models/category.js');
const EpisodeModel = require('./database/models/episode.js');
const TvShowModel = require('./database/models/tv_show.js');
const TokenModel = require('./database/models/token.js');
const UserModel = require('./database/models/user.js');
const ProfileModel = require('./database/models/profile.js');


const sequelize = new Sequelize('tv_time', 'root', 'mrs1', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

/*sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  });
*/

const Episode = EpisodeModel(sequelize, Sequelize);
const Category = CategoryModel(sequelize, Sequelize);
const TvShow = TvShowModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
const Token = TokenModel(sequelize, Sequelize);
const Profile = ProfileModel(sequelize, Sequelize);

//TvShow.belongsTo(Category, { foreignKey: 'categoryId' });
Episode.belongsTo(TvShow);
Token.belongsTo(User);
Category.hasMany(TvShow, {
  foreignKey: 'categoryId',
  as: 'tvid',
  targetKey: 'id',
});
User.hasMany(Profile, {
  foreignKey: 'user_id',
  as: 'userid',
  targetKey: 'id',
});
TvShow.hasMany(Profile, {
  foreignKey: 'my_tvshows_episodes',
  as: 'showid',
  targetKey: 'id',
});

module.exports = {
  Episode,
  Category,
  TvShow,
  User,
  Profile,
  Token
};
