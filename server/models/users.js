module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('user', {
        firstName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        lastName:{
            type:DataTypes.STRING,
            allowNull : false
        },
        email:{
            type: DataTypes.STRING,
           
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false
        },
        hash:{
            type:DataTypes.STRING,
            allowNull : false
        },
        resetPasswordToken:{
            type:DataTypes.TEXT
        },
        resetPasswordExpires:{
            type:DataTypes.DATE
        }
    });
}