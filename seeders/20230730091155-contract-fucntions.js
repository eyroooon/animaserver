const samples = require('../constant/sample');
const _ = require('lodash');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { contractNames, contractAddresses, urls, functionNames, counts } = samples;
    const contractNamesChunks = _.chunk(contractNames, 100);
    const contractAddresseschunks = _.chunk(contractAddresses, 100);
    const urlsChunks = _.chunk(urls, 100);
    const functionNamesChunks = _.chunk(functionNames, 100);
    const countschunks = _.chunk(counts, 100);
    const promises = []
    for (let i = 0; i < contractAddresseschunks.length; i++) {
      const arrayData = contractAddresseschunks[i].map((contractAddress, index) => ({
        contractAddress,
        contractName: contractNamesChunks[i][index],
        contractLink: urlsChunks[i][index],
        functionName: functionNamesChunks[i][index],
        mappingStatus: 'UNMAPPED',
        count: countschunks[i][index],
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      promises.push(queryInterface.bulkInsert('ContractFunctions', arrayData, {}));
    }

    await Promise.all(promises)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
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
