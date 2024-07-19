const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const DBConnection = async()=>{
    const MONGODB_URL = process.env.MONGODB_URI;
    try{
        await mongoose.connect(MONGODB_URL, {useNewUrlParser:true, useUnifiedTopology: true});
        console.log('MongoDB Connected');
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {DBConnection};