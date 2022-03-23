const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
connectDB();
app.use(express.json());
app.get('/', (req, res) => {
    res.send("hello world");
})

app.use('/api/users', userRoutes);

app.listen(1337, ()=>{
    console.log("server ligado na porta 1337");
});