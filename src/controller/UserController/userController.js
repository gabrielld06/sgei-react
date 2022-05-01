import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import User from '../../model/UserMoldels/userMoldels.js'
import generateToken from '../../../server/utils/GenerateToken/index.js'
const registerUser = asyncHandler(async (req, res) => {
    const { username, userType, password, phone, address, city, email, cpf_cnpj } = req.body;

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
            token: generateToken(account._id),
        });
    } else {
        res.status(401);
        throw new Error("Email ou senha invalido");
    }
});

const getUserInfos = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const id = mongoose.Types.ObjectId(userId);
    const [account] = await User.find({ "_id": id });
    if (account) {
        res.status(201).json({
            _id: account._id,
            username: account.username,
            userType: account.userType,
            password: "",
            phone: account.phone,
            address: account.address,
            city: account.city,
            email: account.email,
            cpf_cnpj: account.cpf_cnpj,
        });
    } else {
        res.status(401);
        throw new Error("Email ou senha invalido");
    }
});

const updateUser = asyncHandler(async (req, res) => {
    const { _id, username, userType, password, phone, address, city, email, cpf_cnpj } = req.body;

    if (password === "") {
        await User.findByIdAndUpdate({ '_id': _id }, {
            username: username,
            userType: userType,
            phone: phone,
            address: address,
            city: city,
            email: email,
            cpf_cnpj: cpf_cnpj
        }, (err, result) => {
            if (err) {
                res.send(err);
            }
            if (result) {
                res.status(201).json({
                    _id,
                    username,
                    userType,
                    phone,
                    address,
                    city,
                    email,
                    cpf_cnpj
                })
            }
        }).clone().catch(function (err) { console.log(err) });
    } else {
        await User.findByIdAndUpdate({ '_id': _id }, {
            username: username,
            userType: userType,
            password: password,
            phone: phone,
            address: address,
            city: city,
            email: email,
            cpf_cnpj: cpf_cnpj
        }, (err, result) => {
            if (err) {
                res.send(err);
            }
            if (result) {
                res.status(201).json({
                    _id,
                    username,
                    userType,
                    phone,
                    address,
                    city,
                    email,
                    cpf_cnpj
                })
            }
        }).clone().catch(function (err) { console.log(err) });
    }
})

export { registerUser, authUser, getUserInfos, updateUser };