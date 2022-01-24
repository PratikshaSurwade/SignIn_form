const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb');

const db = mongoose.connection;

db.on('error',() => console.log("Error in connection"));
db.once('open',() => console.log("Connected to Database"))

app.post("/sign_up",(req,res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phoneno = req.body.phoneno;
    var password = req.body.password;

    var data = {
        "name": name,
        "email":email,
        "phoneno": phoneno,
        "password": password
    }

    db.collection('users').insertOne(data,(err,collection) => {
        if(err){
            throw err;
        }
        console.log("Record Inserter Successfully")
    });

    return res.redirect('sigunup_sucess.html')
})

app.get("/", (req , res ) => {
    res.set({
        "Allow-access-Allow-Origin":"*"
    })
    return res.redirect('index.html');
})

app.listen(3000);