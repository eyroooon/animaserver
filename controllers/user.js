const Users = require('../models').users;
const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken');

const secret = 'test';

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await Users.findOne({ where: { email } });
    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

    const token = sign({ email: oldUser.username, id: oldUser._id }, secret, { expiresIn: '1h' });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await Users.findOne({ where: { email } });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await Users.create({ username: email, email, password: hashedPassword, firstName, lastName, role: 'ANALYST' });

    const token = sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

const getUser = async (req, res) => {
  res.json(req.user);
};

module.exports = {
  signin,
  signup,
  getUser
};

