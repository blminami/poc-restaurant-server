module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('intermediate', {
        priceItem:{
            type:DataTypes.FLOAT(10,2),
            allowNull:false
        },
        quantity:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    });
}