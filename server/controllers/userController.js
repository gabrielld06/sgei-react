const { ErrorRounded } = require('@mui/icons-material');
const asyncHandler = require('express-async-handler');
const User = require('../models/userMoldels');

const registerUser = asyncHandler(async (req, res) => {
    const {user, email, password} = req.body;

    const userExist = await User.findOne({email})
    if (userExist){
        res.status(400);
        throw new Error('Email já cadastrado.');
    }

    const newUser = await User.create({
        user,
        email,
        password,
    });

    if (newUser){
        res.status(201).json({
            _id: newUser._id,
            user: newUser.name,
            email: newUser.email,
            password: newUser.password,
        });
    }else{
        res.status(400);
        throw new Error('Algo deu errado :(');
    }

    res.json({
        user,
        password,
    });
});
module.exports = {registerUser};