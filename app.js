const express = require('express');
const mongoose = require('mongoose');
const books = require('./routes/books');
const categories = require('./routes/categories');




const app = express();

app.use(express.json());
app.use('/books', books);
app.use('/categories', categories);


const PORT = process.env.PORT || 9999;

// Connect to mongo 
const db = "mongodb://127.0.0.1:27017/library-system";
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.log(err));



// Run server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});