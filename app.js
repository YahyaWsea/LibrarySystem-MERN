const express = require('express');
const mongoose = require('mongoose');



const app = express();
const PORT = process.env.PORT || 9999;

// Connect to mongo 
const db = "mongodb+srv://yahya:yahya@cluster0-bll02.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(db,{useUnifiedTopology:true , useNewUrlParser:true , useCreateIndex:true , useFindAndModify: false})
    .then(()=>console.log("Connected to MongoDB..."))
    .catch(err=> console.log(err));



// Run server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});