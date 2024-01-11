const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const Article = require("../models/article");
const bcrypt = require('bcrypt');
const User = require("../models/user")
const passport = require("passport");

router.get('/login',(req,res)=>{
  //res.send("ssuccsass")
  res.render('login',{user:User})
});
router.get('/signup',(req,res)=>{
try {
  
  res.render('signup',{user:User})

} catch (error) {
  
}
  


})
router.post('/signup', async (req,res,next)=>{
  console.log(req.body.username)
  try {
    // Hash the user's password
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      // Create a new user with the hashed password
      const user = new User({
        name: req.body.username,
        password: hashedPassword,
        admin:false
      });
     
      // Save the user with the hashed password
      const result = await user.save();
      res.redirect("/");
    });
  } catch (err) {
    return next(err);
  }
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/article/login',  // Redirect to login page on failure
  failureFlash: true  // Enable flash messages for authentication failures
}));


router.post('/logout', (req, res) => {

    req.logout(function(err){
      if(err){return next(err)};
      res.redirect('/article/login');
    }) 
  // Simply call req.logout without a callback function
  // After logging out, redirect to the login page or any other desired page
});





router.delete("/:id", articleController.articleDelete);

router.get("/create", (req, res) => {
  
  res.render("article");
});

router.get("/individarticle/:id", async(req, res) => { 
  try{
    const article = await Article.findById(req.params.id);
    const user = req.user;
  console.log(req.name) 
  console.log(article)
  res.render("individarticle",{input:article,user:user});
  }catch(error){
  }
  
});











router.get("/edit", articleController.articleGet);

router.put("/edit/:id", articleController.articleUpdate);

router.post("/create", articleController.articleCreate);

//////////////////////////// ////////////////////////////////////////////////////////////////////////////////////

/*router.get("/article/individarticle", (req, res) => {
  res.render("individarticle");
});*/
//router.get("/article/individarticle/:id", articleController.articleGet)

/*router.get("/", (req, res) => {
  res.render("article");
});*/


module.exports = router;
