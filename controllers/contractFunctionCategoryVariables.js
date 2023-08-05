const ContractFunctionCategoryVariables = require('../models').contractFunctionCategoryVariables;
const Variables = require('../models').variables;
const Categories = require('../models').categories;
const axios = require('axios');
const abiDecoder = require('abi-decoder');
const { getProvider } = require('../utils/getEther');
const ethers = require('ethers');
const { signatures, getTopicIndex, topicPairing } = require('../constant/hash');
const { getCategoryId } = require('../utils/getCategoryId');
const { objectPairing } = require('../constant/categoryVariablesPairing');
const _ = require('lodash');

const etherUtils = ethers.utils;

const getFCVs = async (req, res) => {
  const { fcvId } = req.query;
  try {
    const LIMIT = 50;

    const results = await ContractFunctionCategoryVariables.findAll({
      where: { contractFunctionId: fcvId },
      limit: LIMIT,
    });
    const fcvsArray = results.map(async (fcv) => {
      const variable = await Variables.findByPk(fcv.variableId);
      const category = await Categories.findByPk(fcv.categoryId);
      const obj = {
        id: fcv.id,
        variable,
        category,
        value: fcv.value,
        logIndex: fcv.logIndex,
        mappedBy: fcv.mappedBy,
      };
      return obj;
    });
    const fcvs = await Promise.all(fcvsArray);
    res.json({ data: fcvs });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createFCV = async (req, res) => {
  const fcv = req.body;
  console.log('here');
  try {
    const newFCV = await ContractFunctionCategoryVariables.bulkCreate(fcv, {
      ignoreDuplicates: true,
    });

    res.status(201).json(newFCV);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updateFCV = async (req, res) => {
  const fcv  = req.body;
  // try {
    // fcv.map((f) => {});
  //   const results = await ContractFunctionCategoryVariables.findAll({
  //     where: { contractFunctionId: fcvId },
  //     limit: LIMIT,
  //   });
  //   if (newFCV) {
  //   }
  //   contractFunction.mappingStatus = mappingStatus;
  //   contractFunction.save();
  //   res.status(200).json(contractFunction);
  // } catch (error) {
  //   res.status(404).json({ message: error.message });
  // }
};

const getData = async (URL) => {
  const res = await axios.get(URL);
  return res.data.result;
};

const removeDuplicates = (arr) => {
  // Define a function to compare two objects
  function isObjectEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  return arr.filter((item, index, self) => {
    // Check if the current item index is the first occurrence of the object in the array
    return self.findIndex((other) => isObjectEqual(item, other)) === index;
  });
};

const removeLeadingZeros = (originalHex) => {
  const newHex = '0x' + parseInt(originalHex, 16).toString(16);
  return newHex;
};

const retrieveByAI = async (req, res) => {
  const { contractAddress, functionName, id } = req.body;
  const provider = await getProvider();
  const API_KEY = '69YMIXR68MVMFX1PZK2HUHQT6SB86Y8GNT';
  const URL = `https://api.etherscan.io/api?module=account&action=txlist&address=${contractAddress}&startblock=0&endblock=99999999&page=1&offset=1000&sort=asc&apikey=${API_KEY}`;
  const fcvs = [];
  if (contractAddress) {
    console.log('here');
    try {
      const data = await getData(URL);
      // res.status(201).json(newFCV);
      if (data) {
        const hashIds = data.filter((contract) => contract.functionName.includes(functionName)).map((c) => c.hash);
        if (hashIds.length > 0) {
          hashIds.forEach(async (hash, index) => {
            if (index <= 0) {
              console.log('here2');
              try {
                const resTransaction = await provider.getTransactionReceipt(hash);
                if (resTransaction && resTransaction.logs && resTransaction.logs.length > 0) {
                  const { logs } = resTransaction;
                  console.log('here3');
                  console.log(logs);
                  logs.forEach(async (log, logIndex) => {
                    const sig = signatures[`${log.topics[0]}`];
                    if (sig) {
                      console.log('4');
                      const data = etherUtils.defaultAbiCoder.decode(sig, log.data);
                      const categoryId = getCategoryId(log.topics[0]);
                      if (categoryId) {
                        Object.keys(topicPairing[`myCategory${categoryId}`]).map((key) => {
                          const fcv = {
                            categoryId,
                            contractFunctionId: id,
                            variableId: key,
                            value: key === '5' ? log.topics[2] : data.toString(),
                            logIndex: log.logIndex,
                            mappedBy: 'AI',
                          };
                          fcvs.push(fcv);
                        });
                      }
                    }
                    if (fcvs.length > 0 && logs.length - 1 === logIndex) {
                      try {
                        // await ContractFunctionCategoryVariables.destroy({
                        //   where: { contractFunctionId: id, mappedBy: 'AI' },
                        // });
                        const newFCV = await ContractFunctionCategoryVariables.bulkCreate(removeDuplicates(fcvs), {
                          fields: ['categoryId', 'contractFunctionId', 'variableId', 'value', 'logIndex', 'mappedBy'],
                          updateOnDuplicate: ['categoryId', 'contractFunctionId', 'variableId', 'value', 'logIndex', 'mappedBy'],
                        });

                        res.status(201).json(newFCV);
                      } catch (error) {
                        res.status(409).json({ message: error.message });
                      }
                    }
                  });
                }
              } catch (error) {
                console.log(error);
                setTimeout(async () => {
                  await createFCV(req, res);
                }, 100);
              }
            }
          });
        }
      }
    } catch (error) {
      setTimeout(async () => {
        await createFCV(req, res);
      }, 100);
      console.log(error.code);
    }
  }
};

module.exports = {
  createFCV,
  getFCVs,
  retrieveByAI,
  updateFCV,
  // getUser
};
