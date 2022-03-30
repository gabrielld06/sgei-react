// const { ErrorRounded } = require('@mui/icons-material');
import asyncHandler from 'express-async-handler';
import User from '../../model/UserMoldels/userMoldels.js'
import generateToken from '../../../server/utils/GenerateToken/index.js'
const registerUser = asyncHandler(async (req, res) => {
    const { username, userType, password, phone, address, city, email, cpf_cnpj } = req.body;

    // feipa depois arruma
    const usernameExist = await User.findOne({ username });
    if (usernameExist) {
        res.status(400);
        throw new Error('Nome de usuario em uso.');
    }
    const emailExist = await User.findOne({ email });
    if (emailExist) {
        res.status(400);
        throw new Error('Email já cadastrado.');
    }
    const cpf_cnpjExist = await User.findOne({ cpf_cnpj });
    if (cpf_cnpjExist) {
        res.status(400);
        throw new Error('CPF já cadastrado.');
    }

    const newUser = await User.create({
        username,
        userType,
        password,
        phone,
        address,
        city,
        email,
        cpf_cnpj
    });

    if (newUser) {
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            userType: newUser.userType,
            password: newUser.password,
            phone: newUser.phone,
            address: newUser.address,
            city: newUser.city,
            email: newUser.email,
            cpf_cnpj: newUser.cpf_cnpj,
            token: generateToken(newUser._id)
        });
    } else {
        res.status(400);
        throw new Error('Algo deu errado :(');
    }
    res.json({
        username,
        userType,
        password,
        phone,
        address,
        city,
        email,
        cpf_cnpj
    });
});

const authUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const account = await User.findOne({ username });

    if (account && (await account.matchPassword(password))) {
        res.status(201).json({
            _id: account._id,
            username: account.username,
            userType: account.userType,
            phone: account.phone,
            address: account.address,
            city: account.city,
            email: account.email,
            cpf_cnpj: account.cpf_cnpj,
            token: generateToken(account._id),
        });
    } else {
        res.status(401);
        throw new Error("Email ou senha invalido");
    }

});

export { registerUser, authUser };