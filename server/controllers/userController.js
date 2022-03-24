// const { ErrorRounded } = require('@mui/icons-material');
import asyncHandler from 'express-async-handler';
import User from '../models/userMoldels.js'

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

export default registerUser;