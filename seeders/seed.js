const sequelize = require('../config/connection');
const { User, VerseModel } = require('../models');

// const userData = require('./userData.json');
const userData = require('./projectData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const verse = await VerseModel.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });


  process.exit(0);
};

seedDatabase();
