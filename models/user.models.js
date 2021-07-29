module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
      user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        notEmpty: true,
        primaryKey: true
      },
      fullname: {
        type: Sequelize.STRING
        // allowNull: false,
        // unique: true
        // notEmpty: true
      },
      firstname: {
        type: Sequelize.STRING
        // allowNull: false,
        // notEmpty: true
      },
      surname: {
        type: Sequelize.STRING
        // allowNull: false,
        // notEmpty: true
      },
      password: {
        type: Sequelize.STRING
        // allowNull,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
        // notEmpty: true
      },
      isAuthor: {
        type: Sequelize.BOOLEAN
      }
    })
    return User
  }
  