//Import
const express = require("express");
const ejs = require("ejs");
const bodyParser = require('body-parser');
const path = require("path");
const compression = require("compression");
//=====================================
require("dotenv").config();

//Router
// const router = express.Router();

// const routes = require(./routes/index)

// app.use()

const app = express();

// compress all responses
app.use(compression());

//PORT
let port= process.env.PORT || 3000;

//View Engine
app.set('view engine', 'ejs');

//Static Folder
app.use(express.static(path.join(__dirname, "public")));  

// Body Parser Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//PATH FILES ==================================================================
//HOME
app.get("/",function(req,res){
    res.render("home",{ msg: false });               
});

app.get("/about",function(req,res){
    res.render("about");               
});

app.get("/buy",function(req,res){
    res.render("buy");               
});

app.get("/sell",function(req,res){
    res.render("sell");               
});

app.get("/rent",function(req,res){
    res.render("rent");               
});

app.get("/contact",function(req,res){
    res.render("contact");               
});

app.get("/enquiry",function(req,res){
    res.render("enquiry");               
});




//Listen on port 4000     
app.listen(port, function() {
    console.log(`Server started on port ${port}`);
}); 

