const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://form:ABCD@cluster0.3rrzddt.mongodb.net/Test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.log('not connected');
  });
const app = express();
app.use((req, res, next) => {
    res.header("Acess-Control-Allow-Origin", "*");
    res.header("Acess-Control-Allow-Method", "GET,PUT,POST,DELETE");
    res.header("Acess-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    next();
});
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({
    extended: true,
})
);
// 
const { Schema, model } = mongoose;
const PersonSchema = new Schema({
    name: String,
    email: String,
    password: String
});
const Person = model("person", PersonSchema);




// const { json } = require("express");
// const mongoose=require("mongoose");
// const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:"*"
}));
// mongoose.set("strictQuery", false);
// mongoose.connect("mongodb+srv://form:sk2496@cluster0.ehmlhyz.mongodb.net/?retryWrites=true&w=majority",{
//     useNewUrlParser: true, 
//     useUnifiedTopology: true,
//     // useFindAndModify: false 
// },()=>{
//     console.log("Db connected");
// });
// mongoose.connect(
//     process.env.MONGO_URL,
//     options
//   )
//   .then(()=>console.log('connected'))
//   .catch(e=>console.log(e));
// const MongoClient = require('mongodb').MongoClient;
// const mongoose = require('mongoose');

// // const uri = `mongodb://form:ABCD@ac-e6ztfmm-shard-00-00.3rrzddt.mongodb.net:27017,ac-e6ztfmm-shard-00-01.3rrzddt.mongodb.net:27017,ac-e6ztfmm-shard-00-02.3rrzddt.mongodb.net:27017/?ssl=true&replicaSet=atlas-b1lqe8-shard-0&authSource=admin&retryWrites=true&w=majority`;

// const client = new MongoClient("mongodb+srv://form:ABCD@cluster0.3rrzddt.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

// client.connect()
//     .then(() => {
//         console.log('start');
//     })
//     .catch(err => {
//         console.error('App starting error:', err.stack);
//         process.exit(1)
//     });

// const Schema = mongoose.Schema;

// const UserSchema = new Schema({
//     user: String,
//     usermail: String,
//     userpwd: String,
//     updated: { type: Date, default: Date.now },
// });

// const user_instance = mongoose.model('UserModel', UserSchema );

// const myUser = new user_instance({ 
//     user: "React JS",
//     usermail: "test@test.com",
//     userpwd: "teest",
// });

// myUser.save(function (err) { 
//     console.log(err) 
// });


// mongoose.connect(
//     "" + process.env.DB_URL,
//     { },
//     () => { console.log("Connected to DB"); }
//   )
app.get("/",(req,res)=>{
    res.send("my appi");
})
// const userSchema=new mongoose.Schema({
//     name:String,
//     email:String,
//     password:String
// })
// const {Schema,model}=mongoose;
// const PersonSchema=new Schema({
//     name:String,
//     age:Number
// });
// const Person=model("person",PersonSchema);
// const person=new Person({
//     name:"g",
//     age:"5"
// });
// person.save();
// const User=new mongoose.model("User",userSchema)
// app.post("/login",(req,res)=>{
//     res.send("my api login");
// })
app.post("/register", (req, res) => {
    const {name,email,password}=req.body
    console.log(req.body)
    const person=new Person({
            name,
            email,
            password
        })
    person.save(err=>{
        if(err){
            res.send(err)
            console.log(err)
        }
        else {
            res.send({massage :"successfully"})
            console.log("s")
        }
     })

})

app.listen(8000, () => {
    console.log("server 8000");
})