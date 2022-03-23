import mongoose from 'mongoose'
// const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    username: {
        type: 'string',
    },
    tipoUsuario: {
        type: 'string',
    },
    senha: {
        type: 'string',
    },
    endereco: {
        type: 'string',
    },
    email: {
        type: 'string',
    },
    CPF_CNPJ: {
        type: 'string',
    }
}, 
{
    timestamps: true,
}
);

const User = mongoose.model("usuariosTeste", userSchema);

export default User;