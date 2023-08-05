const ContractFunctions = require('../models').contractFunctions;
const { Op } = require('sequelize');

const getContractFunctions = async (req, res) => {
  const { page, filter, sort, orderBy, search } = req.query;
  let where = {};
  let order = [];
  console.log(sort);
  switch (filter) {
    case 'mapped':
      where.mappingStatus = 'MAPPED';
      break;
    case 'inreview':
      where.mappingStatus = 'IN_REVIEW';
      break;
    case 'unmapped':
      where.mappingStatus = 'UNMAPPED';
      break;

    default:
      break;
  }
  switch (sort) {
    case 'Count':
      order.push(['count', orderBy.toUpperCase()]);
      break;
    case 'Contract Address':
      order.push(['contractAddress', orderBy.toUpperCase()]);
      break;
    case 'Status':
      order.push(['contractAddress', orderBy.toUpperCase()]);
      break;
    case 'Contract Function':
      order.push(['contractName', orderBy.toUpperCase()]);
      break;

    default:
      break;
  }
  if (search !== '') {
    where = {
      ...where,
      [Op.or]: [
        { contractName: { [Op.substring]: search } },
        { contractAddress: { [Op.substring]: search } },
        { functionName: { [Op.substring]: search } },
      ],
    };
  }

  console.log(where);
  try {
    const LIMIT = 50;
    const offset = (Number(page) - 1) * LIMIT; // get the starting index of every page

    // const total = await PostMessage.countDocuments({});
    const contractFunctions = await ContractFunctions.findAll({
      limit: LIMIT,
      offset,
      where,
      order,
    });
    res.json({ data: contractFunctions });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// export const getPostsBySearch = async (req, res) => {
//     const { searchQuery, tags } = req.query;

//     try {
//         const title = new RegExp(searchQuery, "i");

//         const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

//         res.json({ data: posts });
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }

const getContractFunction = async (req, res) => {
  const { id } = req.params;

  try {
    const contractFunction = await ContractFunctions.findByPk(id);

    res.status(200).json(contractFunction);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// export const createPost = async (req, res) => {
//     const post = req.body;

//     const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

//     try {
//         await newPostMessage.save();

//         res.status(201).json(newPostMessage);
//     } catch (error) {
//         res.status(409).json({ message: error.message });
//     }
// }

const updateContractFunction = async (req, res) => {
  const { id } = req.params;
  const { mappingStatus } = req.body;

  try {
    const contractFunction = await ContractFunctions.findByPk(id);
    contractFunction.mappingStatus = mappingStatus;
    contractFunction.save();
    res.status(200).json(contractFunction);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// export const deletePost = async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

//     await PostMessage.findByIdAndRemove(id);

//     res.json({ message: "Post deleted successfully." });
// }

// export const likePost = async (req, res) => {
//     const { id } = req.params;

//     if (!req.userId) {
//         return res.json({ message: "Unauthenticated" });
//       }

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

//     const post = await PostMessage.findById(id);

//     const index = post.likes.findIndex((id) => id ===String(req.userId));

//     if (index === -1) {
//       post.likes.push(req.userId);
//     } else {
//       post.likes = post.likes.filter((id) => id !== String(req.userId));
//     }

//     const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

//     res.status(200).json(updatedPost);
// }

// export const commentPost = async (req, res) => {
//     const { id } = req.params;
//     const { value } = req.body;

//     const post = await PostMessage.findById(id);

//     post.comments.push(value);

//     const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

//     res.json(updatedPost);
// };

module.exports = {
  getContractFunctions,
  getContractFunction,
  updateContractFunction,
  // getUser
};
