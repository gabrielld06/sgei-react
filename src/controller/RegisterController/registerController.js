import User from '../../model/Users/index.js'


export default async function registerUser(req, res) {
    console.log(req.body);
    const {username, tipoUsuario, senha, endereco, email, CPF_CNPJ} = req.body;

    console.log(email);
    const userExists = await User.findOne({ email });
    console.log('registeruser100011 chegou aqui hein');
    console.log(userExists);
    if(userExists) {
        res.status(400)
        throw new Error("User alredy exists");
    }
    
    console.log('registeruser111 chegou aqui hein');
    const user = await User.create({
        username, tipoUsuario, senha, endereco, email, CPF_CNPJ,
    });
    console.log(user);
    if(user) {
        console.log('registeruser333 chegou aqui hein');
        res.status(201).json({
            _id: user._id,
            username: user.userName,
            tipoUsuario: user.userType,
            senha: user.password, 
            endereco: user.endereco, 
            email: user.email, 
            CPF_CNPJ: user.CPF_CNPJ, 
        });
    } else {
        res.status(400)
        console.error("deu merda aqui ó");
        throw new Error("deu merda aqui ó");
    }
};
