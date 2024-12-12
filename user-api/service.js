const User = require('./models/User');
const bcrypt = require('bcrypt');

const createUser = async (userName, password) => {
  const user = new User({ userName, password });
  await user.save();
  return user;
};

const getUserByUserName = async (userName) => {
  return await User.findOne({ userName });
};

const checkUser = async (userName, password) => {
  const user = await getUserByUserName(userName);
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user;
    }
  }
  return null;
};

const getUserById = async (id) => {
  return await User.findById(id);
};

module.exports = {
  createUser,
  getUserByUserName,
  checkUser,
  getUserById,
};