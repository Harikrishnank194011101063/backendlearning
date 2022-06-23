var express = require('express');
var router = express.Router();
var {mongodb,Mongoclient,dburl}=require('../dbconnection')












/* GET users listing. */
router.get('/',async function(req, res, next) {
  const client= await Mongoclient.connect(dburl)
   const db= await client.db('infos')
   try {
    const user= await db.collection('user').find().toArray()
     res.json({
     statuscode:201,
     data:user




     })



   } catch (error) {
    res.send({
      statuscode:500,
    message:"internal server error"
    })
   }  

});


module.exports = router;



router.post('/', async function(req, res, next) {
  const client= await Mongoclient.connect(dburl)
  try {
  //naming the collection, client kooda connect panni vekkirom yena adhula dhaan iruku andha link connection 
  const db=await client.db('infos')
    //idhula mongoclient la check pandrom erkanave eerukanu
    const user=await db.collection("user").find({email:req.body.email}).toArray()
  if (user.length>0) {
    res.json({
   message:"yo you already signed up bruh try another account"
 ,  statuscode:400


    })
  } else {
    //mela insert pannitu dhaan keela msg laam anupanum cuz no bruh
    const document=await db.collection("user").insertOne(req.body)
    res.json({
    statuscode:201,
    message:"signup successfully"
    //we have to show that here 
   , data:document


   





    })
  }  
  
  
  
  
  
  } catch (error) {
    console.log(error)
    res.send({
    statuscode:500,
    message:"internal server error"
    })
  }





  



});
















router.put('/',async function(req, res, next) {
  const client=await Mongoclient.connect(dburl)

  try {
   const db=await client.db('infos')
   const user=await db.collection('user').find({email:req.body.email}).toArray()
if(user.length>0){
if(user[0].password===req.body.oldpassword){//we gave zero there cuz namba adha first la eduthutu vandhu pandrom //inga namba firstuh kudutha passwiord yuuhm oldpassword uhm crctah eerukaanu paakrom for safety purpose aprm adha maathrom 
 const update=await db.collection('user').updateOne({email:req.body.email},{$set:{password:req.body.newpassword}})
  res.json({  
   message:"password updated",
   statuscode:202
})



}









else{


 res.send({
   statuscode:500,
 message:"invalid credentials "
 })



 
}




}     

else{
res.json({
message:"user does not exist"
,statuscode:400


})





}
      
  } catch (error) {
   res.send({
     statuscode:500,
     message:"internal server error"
     })
  }
 });
 
 








 router.post('/login', async function(req, res, next) {
  const client= await Mongoclient.connect(dburl)
  try {
  //naming the collection, client kooda connect panni vekkirom yena adhula dhaan iruku andha link connection 
  const db=await client.db('infos')
    //idhula mongoclient la check pandrom erkanave eerukanu
    const user=await db.collection("user").find({email:req.body.email}).toArray()//inga we are checkin if the email is there
 if(user.length>0){
let  user=await db.collection('user').findOne({email:req.body.email})//inga we are getting particular email full info to find the password
if(user.password===req.body.password)
{
res.json({
message:"login successful",
statuscode:200
})





}
else{//inga if assword is not same namba indha msg ah display pannuvom
res.json({

message:"invalid credentials",
statuscode:404

})



}




 }
  
  
  
  
  
  
  } catch (error) {
    console.log(error)
    res.send({
    statuscode:500,
    message:"internal server error"
    })
  }





  



});





















module.exports = router;

