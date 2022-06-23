const mongodb=require('mongodb')
const Mongoclient=mongodb.MongoClient
const dbname="backendlearning "
const dburl=`mongodb+srv://haricodes:harikrishna3@cluster0.uhre7ba.mongodb.net/test${dbname}`




module.exports={mongodb,Mongoclient,dburl}