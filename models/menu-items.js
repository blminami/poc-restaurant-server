module.exports = (sequelize, DataTypes) => {
  return sequelize.define('menuItem', {
    foodType: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT(10, 2),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};
