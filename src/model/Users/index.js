// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const { modalUnstyledClasses } = require('@mui/material');

// const userSchema = mongoose.Schema({
//     username: {
//         bsonType: 'string',
//         description: 'must be a string and is required'
//     },
//     tipoUsuario: {
//         'enum': [
//             'espectador',
//             'criadorDeEvento',
//             'apresentador'
//         ],
//         description: 'can only be one of the enum values and is required'
//     },
//     senha: {
//         bsonType: 'string',
//         description: 'must be a string and is required'
//     },
//     endereco: {
//         bsonType: 'string',
//         description: 'must be a string and is required'
//     },
//     email: {
//         bsonType: 'string',
//         pattern: '[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?',
//         description: 'must be a string, must match the regular expression pattern and is required'
//     },
//     CPF_CNPJ: {
//         bsonType: 'string',
//         pattern: '([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})',
//         description: 'must be a string, must match the regular expression pattern and is required'
//     }
// }, 
// {
//     timestamps: true,
// }
// );

// const User = mongoose.model("usuarios", userSchema);

// module.exports = User;