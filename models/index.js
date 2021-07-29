const Sequelize = require('sequelize')
const config = require('../config/db.config')



const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
      host: config.HOST,
      port: config.PORT,
      dialect: config.dialect,
      operatorsAliases: false,
  
      pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
      },
      dialectOptions: {
        connectTimeout: 60000,
        ssl: {
          rejectUnauthorized: false
        }
      }
    }
  )


  
const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize


db.user = require('../models/user.models')(sequelize, Sequelize)
db.post = require('../models/post.models')(sequelize, Sequelize)
db.comments = require('../models/comment.models')(sequelize, Sequelize)
db.rating = require('../models/rating.models')(sequelize, Sequelize)

db.user.hasMany(db.post, { foreignKey: 'user_id' })
db.post.hasMany(db.comments, { foreignKey: 'post_id' })
db.post.hasMany(db.rating, { foreignKey: 'post_id' })

module.exports = db
