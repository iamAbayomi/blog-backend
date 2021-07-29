module.exports = ( sequelize ,Sequelize)=>{
    const Comments = sequelize.define('comments', {
        comment_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            notEmpty: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        comment_message: {
            type: Sequelize.STRING
        },
    })
    return Comments
}