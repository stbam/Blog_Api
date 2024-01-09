const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const Article = require("../models/article");
const User = require("../models/user")


router.get('/login',(req,res)=>{
  res.render('login',{user:User})
});
router.get('/sign-up',(req,res)=>{
  res.render('signup')
})
router.post('/register',(req,res)=>{
  const {name,password}= req.body;
  const user= new User({
    name:name,
    password:password,
  })
  user.name= req.body.name;
  user.password=req.body.pasword;
  
  res.send("received");
})
router.post('/login',(req,res)=>{
  res.redirect('/')
})


router.delete("/:id", articleController.articleDelete);

router.get("/create", (req, res) => {
  res.render("article");
});

router.get("/individarticle/:id", async(req, res) => { 
  const article = await Article.findById(req.params.id);

  console.log(article)
  res.render("individarticle",{input:article});
});


router.get("/edit", articleController.articleGet);

router.put("/edit/:id", articleController.articleUpdate);

router.post("/create", articleController.articleCreate);

//////////////////////////// ////////////////////////////////////////////////////////////////////////////////////

/*router.get("/article/individarticle", (req, res) => {
  res.render("individarticle");
});*/
//router.get("/article/individarticle/:id", articleController.articleGet)
router.get("/", (req, res) => {
  res.render("article");
});

module.exports = router;
