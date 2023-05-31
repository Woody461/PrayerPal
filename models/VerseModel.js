const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class VerseModel extends Model {}

VerseModel.init(
  {
    verse_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    }, 
    verse: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    book: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chapter: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    verse_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'VerseModel',
  }
);
module.exports = VerseModel;
