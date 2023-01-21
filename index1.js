const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const app=express();
const dotenv =require("dotenv"); 
dotenv.config();
const db=process.env.DB;
const port=process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
app.use(cors({
    origin:"*"
}));
mongoose.set('strictQuery', false);

mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("mongo db connected");
}).catch((e)=>{
console.log(e);
});

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
});
const User= new mongoose.model("User",userSchema);
app.post("/login",(req,res)=>{
    const {email,password}=req.body
    User.findOne({email:email},(err,user)=>{
        if(user){
                if(password===user.password){
                    res.send({massage:"Login Successful",user:user})
                    
                }else{
                    res.send({massage:"Password didn't match"})
                   
                }
        }else{
           
            res.send({massage:"User not registered"})
        }
    })
})
app.post("/register",(req,res)=>{
    const {name,email,password}=req.body.user
    User.findOne({email:email},(err,user)=>{
         if(user){
            res.send({massage:"User already register"})
             
         }else{
            const user=new User({
                name,
                email,
                password
            })
            user.save(err=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({massage:"Successfully Registered, please login now."});
                }
            });



         }



    })
  
});
app.listen(port,()=>{
    console.log("server 8000");
});
