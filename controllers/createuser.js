const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.createUser = async function (req, res) {
    // console.log(req.body);
    // check to see if a user exists
    let userExist = await User.findOne({ where: {email: req.body.email }});
    if(!userExist){
        // hashing of password 
        let salt = await bcrypt.genSaltSync(10);
        let hashedPassword = await  bcrypt.hash(req.body.password, salt);

        await User.create({username: req.body.username,
            password: hashedPassword.toString(),
        email: req.body.email}).then(() => {
            // return res.status(201).send("User" + `${ req.body.username}` +  "was added to table succesfully")
            return res.send(`${userExist.username} account was created!`);
        }).catch((err) => {
            return res.status(400).send(`${err.message}: Couldn't add user.`);
        });
    }
    else{
        return res.send("This username exists.\nForgot password?")
    }
    
    
}