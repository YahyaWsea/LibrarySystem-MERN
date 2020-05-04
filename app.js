const express = require('express');
const mongoose = require('mongoose');
const config = require('config');



const books = require('./routes/books');
const categories = require('./routes/categories');
const User = require('./models/User');


const app = express();

app.use(express.json());
app.use('/books', books);
app.use('/categories', categories);
app.use('/users', require('./routes/users'));
app.use('/rate', require('./routes/rates'));


const PORT =  8888;



app.use(express.json());
// app.post('/users', (req, res) => {
//     const newUser = new User(req.body);

//     bcypt.genSalt(10).then((salt)=>{ console.log( `this is salt : ${salt}`);
//      });
//     bcypt.hash( req.body.password , 10)
//         .then(pass =>{
//             console.log(`this is hashed password : ${pass}`);
//         });
    
//     newUser.save()
//         .then(user => {
//             res.json(user)
//         })
//         .catch(err=> console.log(err));
//     // console.log(req.body);
// })



// Connect to mongo 
const db = config.get('MONGO_URL');
console.log(db);

mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.log(err));




// Run server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});