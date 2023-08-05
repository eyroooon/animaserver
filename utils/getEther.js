const { ethers } = require('ethers');

const etherUtils = ethers.utils

const getProvider = async () => new ethers.providers.EtherscanProvider('homestead', '69YMIXR68MVMFX1PZK2HUHQT6SB86Y8GNT')
    

  
  module.exports = {
    getProvider,
    etherUtils,
  };
  