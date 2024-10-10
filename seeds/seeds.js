const mongoose = require('mongoose');
const { User, Thought } = require('../models');
const db = require('../config/connection');

const seedUsers = [
  {
    username: 'firstUser',
    email: 'first@user.com',
  },
  {
    username: 'secondUser',
    email: 'second@user.com',
  },
];

const seedThoughts = [
  {
    thoughtText: 'Pizza is good',
    username: 'firstUser',
    reactions: [
      {
        reactionBody: 'best with pepperoni',
        username: 'secondUser',
      },
    ],
  },
  {
    thoughtText: 'sushi sucks',
    username: 'secondUser',
    reactions: [
      {
        reactionBody: 'UR wrong!',
        username: 'firstUser',
      },
    ],
  },
];

db.once('open', async () => {
  try {
    // Clear existing users and thoughts
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Add users
    const createdUsers = await User.collection.insertMany(seedUsers);

    // Add thoughts
    for (let i = 0; i < seedThoughts.length; i++) {
      const { _id } = await Thought.create(seedThoughts[i]);
      const user = await User.findOneAndUpdate(
        { username: seedThoughts[i].username },
        { $addToSet: { thoughts: _id } },
        { new: true }
      );
    }

    console.log('Users, thoughts, and reactions seeded!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});