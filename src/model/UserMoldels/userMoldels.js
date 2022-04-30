import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    username: {
        type: 'string',
        required: true,
        unique: true,
    },
    userType: {
        type: 'string',
        required: true,
    },
    password: {
        type: 'string',
        required: true,
    },
    phone: {
        type: 'string',
        required: true,
    },
    address: {
        type: 'string',
        required: true,
    },
    city: {
        type: 'string',
        required: true,
    },
    email: {
        type: 'string',
        required: true,
        unique: true,
    },
    cpf_cnpj: {
        type: 'string',
        required: true,
        unique: true,
    },
    tickets: {
        type: 'array',
    }
},
    {
        timestamps: true,
    }
);

// compara a senha de login com a senha encriptada do bd
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// encripta a senha toda vez que for atualizada no modelo antes de enviar para o bd
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.pre('findOneAndUpdate', async function (next) {
    let data = this.getUpdate();
    if (!data.password) {
        console.log(data.password);
        next();
    } else {
        const salt = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password, salt);
    }
});

const User = mongoose.model("usuarios", userSchema);

export default User;