const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require("dotenv");

const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended:true
}))

// mongoose.connect('mongodb://localhost:27017/mydb');

// mongoose.connect('mongodb+srv://signindata:signindata@cluster0.rhw5e.mongodb.net/signindata?retryWrites=true&w=majority');

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }) 

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
        console.log("Record Inserted Successfully")
    });

    
    return res.redirect('/signup_sucess.html')
})

app.get("/", (req , res ) => {
    res.set({
        "Allow-access-Allow-Origin":"*"
    })
    return res.redirect('public/index.html');
})

app.listen(8000);