module.exports = ( sequelize ,Sequelize)=>{
    const Posts = sequelize.define('posts', {
        post_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            notEmpty: true,
            primaryKey: true
        },
        post_title: {
            type: Sequelize.STRING
        },
        post_description: {
            type: Sequelize.STRING
        },
        rating: {
            type: Sequelize.STRING
        }
    })
    return Posts
}