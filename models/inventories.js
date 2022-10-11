'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class inventories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  inventories.init({
    username: DataTypes.STRING,
    day: DataTypes.INTEGER,
    veax: DataTypes.INTEGER,
    mozuc: DataTypes.INTEGER,
    zeyoc: DataTypes.INTEGER,
    gloop: DataTypes.INTEGER,
    spanu: DataTypes.INTEGER,
    credits: DataTypes.INTEGER,
    weather: DataTypes.STRING,
    popularity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'inventories',
  });
  return inventories;
};