const dotenv=require('dotenv')
dotenv.config()
const express = require('express');
const path = require('path');
const db=require('./config/connection')
const PORT =3000;
const app = express();
const signInRouter=require('./routes/signInRouter')
const auth=require('./routes/auth')
const userRouter=require('./routes/userRouter');
const bodyParser = require('body-parser');

// Middleware

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/api',auth)


  
app.listen(PORT,() => {
    console.log(`Server running at http://localhost:${PORT}`);
  });  