// const mongoose = require('mongoose');
import mongoose from 'mongoose'

export default async function connectDB() {
    try {
        console.log("Trying to connect");
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch(e) {
        console.error(e);
        process.exit();
    }
};