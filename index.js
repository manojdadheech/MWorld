import express from  'express';
import connectDB from './Db/Dbconnect.js';
import route from './route/web.js';
import cookies from 'cookie-parser'
import login from './route/login.js';
import notes from './route/notes.js';
const app= express();

//Connecting to the database
connectDB()

app.set('view engine', 'ejs');

//Static files
app.use(express.static('public'));
app.use(cookies())
app.use(express.urlencoded({ extended: true }));
app.use('/',route);
app.use('/',login);
app.use('/',notes);




app.listen(process.env.PORT,()=>{console.log("Server is running on port 3000")})