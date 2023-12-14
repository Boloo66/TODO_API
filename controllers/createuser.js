const User = require("../models/user");
const bcrypt = require("bcrypt");

module.exports.createUser = async function (req, res) {
  // console.log(req.body);
  // check to see if a user exists
  let userExist = await User.findOne({ where: { email: req.body.email } });

  if (userExist) { console.error('User exists oooo!'); return res.status(409).send("This username exists.\nForgot password?") }

  // hashing of password
  let salt = bcrypt.genSaltSync(10);
  let hashedPassword = await bcrypt.hash(req.body.password, salt);

  try {
    const user = await User.create({
      username: req.body.username, // TODO find how to make sure that usernames are not case-insensitive duplicates
      password: hashedPassword.toString(),
      email: req.body.email.toLowerCase(),
    });
    return res.send(`${user.username} account was created!`);
  } catch (error) {
    return res.status(400).send(`${err.message}: Couldn't add user.`);
  }
};
