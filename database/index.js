const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const userSchema = require('./schema/userSchema');
const User = mongoose.model('user', userSchema, 'users');

const connectionString = process.env.MONGO_URL;

async function createUser(username) {
  return new User({
    username,
    created: Date.now(),
  }).save();
}

async function findUser(username) {
  return await User.findOne({ username });
}

(async () => {
  const connector = mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const username = process.argv[2].split('=')[1];

  let user = await connector.then(async () => {
    return findUser(username);
  });

  if (!user) {
    user = await createUser(username);
  }

  console.log(user);
  process.exit(0);
})();
