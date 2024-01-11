const express = require("express");
const app = express();
const Article = require("./models/article");
const User = require("./models/user")
const methodOverride = require("method-override");
const articleRouter = require("./routes/article");
const session = require("express-session");
const passport = require('passport');
const passportfunctions= require('./passport/local');
const flash = require('connect-flash');
const auth=  require('./passport/local')


const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://stbacmtd:Stru5932@cluster0.jw02qwx.mongodb.net/?retryWrites=true&w=majority");



app.use(methodOverride("_method"));
app.set("view engine", "ejs");

passportfunctions.Setup();
app.use(session({ secret: "kitten", resave: false, saveUninitialized: true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/stylesheets', express.static('public/stylesheets'));
app.use('/assets', express.static('assets'));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/article", articleRouter);

app.use(function(req, res, next) {
  res.locals.user = req.user;
  //console.log(res.locals.user)
  next();
});



app.get("/", async (req, res) => {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    // Access user information
    const user = req.user;
    //console.log(user);

    // Retrieve articles or perform any other actions you need
    const articles = await Article.find({});
    
    // Render the index page with user and articles data
    res.render("index", { articles, user });
  } else {
    // If the user is not authenticated, you can handle it accordingly
    res.redirect("/article/login"); // Redirect to login page or another authentication route
  }
});









/*app.get("/", async (req, res) => {
  try {
    const user = await User.findOne({});
    console.log(user);

    // Accessing the 'name' property
    const userName = user.name;
console.log(userName)
    const articles = await Article.find({});
    res.render("index", { articles, user: userName });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
*/


app.listen(5005);
