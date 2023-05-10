const User = require('../models/User');
const { ObjectID } = require('mongodb');
const { getDb } = require('../connection');

const getAllUsers = async (req, res) => {
  try {
    const db = getDb();
    const users = await db.collection('users').find().toArray();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = new User({ name, email, password });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};



const getUserById = async (req, res) => {
  try {
    const db = getDb();
    const user = await db.collection('users').findOne({ _id: ObjectID(req.params.id) });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const updateUserById = async (req, res) => {
  try {
    const db = getDb();
    const { username, email } = req.body;
    const updatedUser = await db.collection('users').findOneAndUpdate(
      { _id: ObjectID(req.params.id) },
      { $set: { username, email } },
      { returnOriginal: false }
    );
    if (updatedUser.value) {
      res.status(200).json(updatedUser.value);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


const deleteUserById = async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('users').deleteOne({ _id: ObjectID(req.params.id) });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById
};
