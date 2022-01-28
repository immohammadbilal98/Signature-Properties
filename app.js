//Import
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const path = require("path");
const compression = require("compression");
const res = require("express/lib/response");
// const router = express.Router();
//=====================================
require("dotenv").config();

//Router
// const router = express.Router();

// const routes = require(./routes/index)

// app.use()

const app = express();

// compress all responses
app.use(compression());

// app.use('/subdir',require('./routes/subdir'));

// app.get("/off-plan/talia",(req,res) =>{
//   res.sendFile(path.join(__dirname,'..','views','subdir','talia.ejs'))
// });

//PORT
let port = process.env.PORT || 3000;

//View Engine
app.set("view engine", "ejs");

//Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Body Parser Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Data for filter
const data = [
  {
    name: "NEW COMMUNITY BY EMAAR EDEN, THE VALLEYYYYY",
    price: 100,
    address: "Eden, The Valley, Dubai",
    area: 24000,
    type: "Villa",
    bedrooms: 5,
    bathrooms: 5,
    brand: "Emaar",
    imageLink: "1.jpg",
  },
  {
    name: "NEW COMMUNITY BY EMAAR EDEN, THE VALLEY 111",
    price: 200,
    address: "Eden, The Valley, Dubai",
    area: 20000,
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    brand: "Emaar",
    imageLink: "3.jpg",
  },
  {
    name: "COMMUNITY BY EMAAR EDEN, THE VALLEY 222",
    price: 300,
    address: "Eden, The Valley, Dubai",
    area: 15000,
    type: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    brand: "Emaar",
    imageLink: "1.jpg",
  },
  {
    name: "Modern COMMUNITY BY EMAAR EDEN, THE VALLEY",
    price: 400,
    address: "Eden, The Valley, Dubai",
    area: 28000,
    type: "Studio",
    bedrooms: 2,
    bathrooms: 2,
    brand: "Emaar",
    imageLink: "2.jpg",
  },
  {
    name: "NEW Area BY Al Barari EDEN, THE VALLEY",
    price: 500,
    address: "Eden, The Valley, Dubai",
    area: 29500,
    type: "Studio",
    bedrooms: 5,
    bathrooms: 5,
    brand: "Al Barari",
    imageLink: "3.jpg",
  },
  {
    name: "NEW COMMUNITY BY Al Barari EDEN, THE VALLEY",
    price: 600,
    address: "Eden, The Valley, Dubai",
    area: 34000,
    type: "Villa",
    bedrooms: 5,
    bathrooms: 5,
    brand: "Al Barari",
    imageLink: "2.jpg",
  },
];

function filterResponse(filter) {
  return data.filter((item) => {
    let resp = [];
    if (filter.minArea && filter.minArea !== "NaN")
      resp.push(item.area >= filter.minArea);
    if (filter.maxArea && filter.maxArea !== "NaN")
      resp.push(item.area <= filter.maxArea);
    if (filter.minPrice && filter.minPrice !== "NaN")
      resp.push(item.price >= filter.minPrice);
    if (filter.maxPrice && filter.maxPrice !== "NaN")
      resp.push(item.price <= filter.maxPrice);
    if (filter.baths && filter.baths !== "NaN")
      resp.push(item.bathrooms == filter.baths);
    if (filter.beds && filter.beds !== "NaN")
      resp.push(item.bedrooms == filter.beds);
    if (filter.brand) resp.push(item.brand === filter.brand);
    if (filter.type) resp.push(item.type === filter.type);
    if (filter.name)
      resp.push(
        item.name.toLowerCase().indexOf(filter.name.toLowerCase()) > -1
      );
    return !resp.some((item) => item === false);
  });
}
function createFilters() {
  let filterObj = {};
  var lowestPrice = Number.POSITIVE_INFINITY;
  var highestPrice = Number.NEGATIVE_INFINITY;
  var lowestArea = Number.POSITIVE_INFINITY;
  var highestArea = Number.NEGATIVE_INFINITY;
  var lowestBeds = Number.POSITIVE_INFINITY;
  var highestBeds = Number.NEGATIVE_INFINITY;
  var lowestBaths = Number.POSITIVE_INFINITY;
  var highestBaths = Number.NEGATIVE_INFINITY;

  let brands = new Set();
  let type = new Set();
  for (var i = data.length - 1; i >= 0; i--) {
    let item = data[i];

    if (item.price < lowestPrice) lowestPrice = item.price;
    if (item.price > highestPrice) highestPrice = item.price;
    if (item.area < lowestArea) lowestArea = item.area;
    if (item.area > highestArea) highestArea = item.area;
    if (item.bedrooms < lowestBeds) lowestBeds = item.bedrooms;
    if (item.bedrooms > highestBeds) highestBeds = item.bedrooms;
    if (item.bathrooms < lowestBaths) lowestBaths = item.bathrooms;
    if (item.bathrooms > highestBaths) highestBaths = item.bathrooms;
    brands.add(item.brand);
    type.add(item.type);
  }
  filterObj.minArea = lowestArea;
  filterObj.maxArea = highestArea;
  filterObj.minPrice = lowestPrice;
  filterObj.maxPrice = highestPrice;
  filterObj.minBeds = lowestBeds;
  filterObj.maxBeds = highestBeds;
  filterObj.minBaths = lowestBaths;
  filterObj.maxBaths = highestBaths;
  filterObj.brands = Array.from(brands);
  filterObj.types = Array.from(type);
  return filterObj;
}
//PATH FILES ==================================================================
//HOME
app.get("/",function(req,res){
    res.render("home",{ msg: false });               
});

app.get("/about",function(req,res){
    res.render("about",{ msg: false });               
});


app.get("/buy",function(req,res){
    res.render("buy",{ msg: false });               
});

app.get("/sell",function(req,res){
    res.render("sell",{ msg: false });               
});

app.get("/rent", function (req, res) {
    if (data && data.length) {
      let reqBody = {};
      reqBody.properties = data;
      reqBody.filter = createFilters();
      res.render("rent", reqBody);
    } else res.render("rent", { properties: [] });
  });
  
app.post("/rent", function (req, res) {
  const reqBody = req.body;
  if (reqBody && Object.keys(reqBody).length) {
    let resBody = filterResponse(reqBody);
    res.json(resBody);
  } else {
    res.send({ message: "Please provide a valid request body" });
  }
});

app.get("/off-plan",function(req,res){
    res.render("off-plan",{ msg: false });               
});

app.get("/off-plan/talia",function(req,res){
  res.render("./ofd/talia",{ msg: false });               
});

app.get("/contact",function(req,res){
    res.render("contact",{ msg: false });               
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

