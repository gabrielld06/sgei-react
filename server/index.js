import express from 'express'
import dotenv from 'dotenv'
import connectDB from '../config/index.js'
// import userRoutes from '../routes/userRoutes.js'
import registerUser from '../src/controller/RegisterController/registerController.js';
const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.use('/api/users', registerUser);

app.listen(1337, ()=>{
    console.log("server ligado na porta 1337");
});