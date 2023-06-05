const sequelize = require('../config/connection');
const { User, VerseModel } = require('../models');

const userData = require('./userData.json');
const bibleVerses = require('./bibleVerses.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const verse = await VerseModel.bulkCreate(bibleVerses, {
    individualHooks: true,
    returning: true,
  });

  const user = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
  });

  process.exit(0);
};

seedDatabase();
