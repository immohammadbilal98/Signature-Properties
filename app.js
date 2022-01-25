//Import
const express = require("express");
const ejs = require("ejs");
const bodyParser = require('body-parser');
const path = require("path");
const compression = require("compression");
const nodemailer = require('nodemailer');
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
    res.render("about",{ msg: false });               
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

app.get("/off-plan",function(req,res){
    res.render("off-plan");               
});

app.get("/contact",function(req,res){
    res.render("contact");               
});

app.get("/enquiry",function(req,res){
    res.render("enquiry");               
});

//NODMAILER -CONTACT FORM

app.post('/send', (req, res) => {
    const output = `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>  
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone No.: ${req.body.phone}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.message}</p>
    `;
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'mail.signature.property',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: process.env.USER, // generated ethereal user
          pass: process.env.PASS  // generated ethereal password
      },
      tls:{
        rejectUnauthorized:false
      }
    });
  
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Nodemailer Contact" <contactform@signature.property>', // sender address
        to: 'im.mohammedbilal98@gmail.com', // list of receivers
        subject: 'Node Contact Request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };
  
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
        res.render("home", { msg: "email has been sent. " });
    });
    });
  


//Listen on port 4000     
app.listen(port, function() {
    console.log(`Server started on port ${port}`);
}); 

