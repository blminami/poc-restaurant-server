module.exports = (sequelize, DataTypes) => {
  return sequelize.define('restaurant', {
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 20]
      }
    },
    street: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    streetNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    longitude: {
      type: DataTypes.FLOAT(9, 6),
      allowNull: false
    },
    latitude: {
      type: DataTypes.FLOAT(9, 6),
      allowNull: false
    }
  });
};
