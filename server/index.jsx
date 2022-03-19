const express = require('express');
const app = express();

app.get('/login', (req, res) => {
    res.send("hello world");
})

app.listen(1337, ()=>{
    console.log("server ligado na porta 1337");
});