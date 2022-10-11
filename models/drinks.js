'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class drinks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  drinks.init({
    username: DataTypes.STRING,
    vemo: DataTypes.INTEGER,
    moze: DataTypes.INTEGER,
    veze: DataTypes.INTEGER,
    vemospanu: DataTypes.INTEGER,
    mozespanu: DataTypes.INTEGER,
    vezespanu: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'drinks',
  });
  return drinks;
};