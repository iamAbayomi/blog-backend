module.exports = ( sequelize ,Sequelize)=>{
    const Comments = sequelize.define('rating', {
        rating_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            notEmpty: true,
            primaryKey: true
        },
        rating_value: {
            type: Sequelize.INTEGER
        }
    })
    return Comments
}