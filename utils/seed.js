// base code used from this url: https://javascript.plainenglish.io/seeding-mongodb-database-from-node-the-simplest-way-3d6a0c1c4668


const connection = require('../config/connection');
const { Thought, User } = require('../models');

const seedUsers = [
    {
        "username": "11test",
        "email": "11test@test.com"
      },
      {
        "username": "12test",
        "email": "12test@test.com"
      },
      {
        "username": "13test",
        "email": "13test@test.com"
      },
      {
        "username": "14test",
        "email": "14test@test.com"
      },
      {
        "username": "15test",
        "email": "15test@test.com"
      } 

]

const seedThoughts = [
    {
        "thoughtText": "11 Thought text sample thought",
        "username": "11test "
      },
      {
        "thoughtText": "12 Thought text sample thought",
        "username": "12test "
      },
      {
        "thoughtText": "13 Thought text sample thought",
        "username": "13test "
      },
      {
        "thoughtText": "14 Thought text sample thought",
        "username": "14test "
      },
      {
        "thoughtText": "15 Thought text sample thought",
        "username": "15test "
      }
]

const seedDB = async () => {
    await User.deleteMany({});
    await Thought.deleteMany ({});
    await User.insertMany(seedUsers);
    await Thought.insertMany(seedThoughts);
}


seedDB().then(() => {
    console.log ('---- DATABASE SEEDED -----');
});


