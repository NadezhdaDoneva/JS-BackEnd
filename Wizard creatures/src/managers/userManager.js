const User = require('../models/User');
const jwt = require('../lib/jwt');
const bcrypt = require('bcrypt');
const {secret} = require('../config/config');


exports.getUser = (userId) => User.findById(userId);

exports.login = async (email, password) => {
   
    const user = await User.findOne({email});

    if (!user) {
        throw new Error('Invalid user or password');
    }
    //check password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Invalid user or password');
    }

   const token = await generateToken(user);
   return token;
};

exports.register = async (userData) => {
    const user = await User.findOne({email: userData.email});
    if (user) {
        throw new Error('User already exists');
    }
    const createdUser = await User.create(userData);
    
    const token = await generateToken(createdUser);
    return token;

}

async function generateToken(user) {
    const payload = {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
    };

    
    const token = await jwt.sign(payload, secret, {expiresIn: '2d'});

    return token;
}