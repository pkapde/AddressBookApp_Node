const express = require('express');
const expressValidator=require('express-validator');
const cors =require('cors');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const router = require('./routes/routes');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use('/',router);

mongoose.connect('mongodb://localhost:27017/AddressBookNode',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("It's connected");
}).catch((error)=>{
    console.log("database not connected",error);
});

app.listen(3000, () => {
    console.log('server is listening')
})
