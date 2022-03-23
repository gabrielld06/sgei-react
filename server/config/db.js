const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://DRKnight:m2j60gxkfPq5DIZV@sogei.kcs0c.mongodb.net/test"
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongoURI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit();
    }
};
module.exports = connectDB;