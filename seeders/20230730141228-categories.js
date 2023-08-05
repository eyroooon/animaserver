'use strict';
const categories = require('../constant/categories');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { categoryNames, categoryNotes } = categories;

    const arrayData = categoryNames.map((categoryName, index) => ({
      categoryName,
      categoryNotes: categoryNotes[index],
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Categories', arrayData, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
