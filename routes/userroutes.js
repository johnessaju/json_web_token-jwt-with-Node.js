const express = require('express');
const router = express.Router();
const user = require('../model/usermodel');

const bcrypt = require('bcrypt');

const jwt =   require('jsonwebtoken');


const deletedtoken=[];



router.get('/',(req,res)=>{ // gets all users (user list)
    user.find().then(user=>{
        res.send(user)
    });
})

router.get('/profile',jwtverify,(req,res)=>{ // get user info based on token note:only valid for 15 sec
    console.log(req.user[0]);
   user.find(req.user.user[0]).then(user=>{
    res.send(user);
   });
    
});

router.post('/signup',async (req,res)=>{ // sign up a new user
    
   const salt =await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password,10);
   
    const newuser = new user({
        name:req.body.name,            
        password:hashedpassword,
        mailid:req.body.mailid,
        distancerun:req.body.distancerun,
        calorieburned:req.body.calorieburned,   

    });
    newuser.save().then(user=>{
        res.json(user);
    })
});

router.post('/signin',async (req,res)=>{ // sign in a user to create a token
    user.find({name:req.body.name}).then(async user=>{
try{
        if(user){
      const auth= await bcrypt.compare(req.body.password, user[0].password);
     
      if(auth) {
      
    const token = jwt.sign({user},process.env.secret,{ expiresIn: '20s' });
    res.send(`logged in and token is ${token}`); 
    } 
      else
       return res.send("error in pasword");
        }
    }catch(err){
        res.send("error in login"+err);
    }
    })
   
});


router.delete('/signout',(req,res)=>{  //signout
 console.log(deletedtoken);
    deletedtoken.push(req.header('authentication_token'))
console.log(deletedtoken);
res.send("deleted");
});


function jwtverify(req,res,next){
const token= req.header('authentication_token');

if(!token || deletedtoken.includes(token) )
return res.status(401).send("token not available");

try{
    req.user = jwt.verify(token,process.env.secret);
    console.log(req.user);
    next();
}catch(err){
    res.status(400).send("invalid token");
}

}




module.exports = router;