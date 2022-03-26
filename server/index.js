import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import cors from 'cors'

dotenv.config();

connectDB();

const app = express();

app.use(cors()); // Pass through CORS block
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

app.listen(5000, ()=>{
    console.log("server ligado na porta 5000");
});