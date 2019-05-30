const express = require("express");
const app =express();
const bodyParser= require("body-parser");
const cookieParser= require("cookie-parser");


app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
var usercount=0;
var sent;
app.use(function(req, res, next){
    // check if client sent cookie
      var cookie = req.cookies.usercount;
      if (cookie === undefined)
      {
        // no: set a new cookie
        usercount++;
        res.cookie('usercount',usercount, { maxAge: 900000, httpOnly: true });
        console.log('cookie created successfully');
        sent=usercount;
      } 
      else
      {
        // yes, cookie was already present 
        console.log('cookie exists', cookie);
        sent=req.cookies.usercount;
      } 
    next();
});

app.get("/",function(req,res){
    res.render("index",{usercount:sent});
});


app.listen(process.env.PORT, process.env.IP, function(req,res){
  console.log('listening on'+process.env.PORT);
});