const Article = require("../models/article");
const multer = require('multer')
const User = require("../models/user")
/*exports.articleGet =  async(req,res)=>{
   // res.send('article gotten!')
   const articles = await Article.findOne(req.params.id)
   

   res.render('individarticle',{article:articles})
}  */


exports.articleGet = async (req, res) => {
  const articles = await Article.findById(req.params.id);
//console.log('test')
  res.render("edit", { article: articles , user:User});
};

exports.articleDelete = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);

    const postId = req.params.id;

    //   res.json({ message: 'Article deleted successfully', deletedArticleId: postId }); could be?
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  res.redirect("/");
};

//dateCreated,description,published
exports.articleUpdate = async (req, res, next) => {
  try {
   // console.log(req.user._id +"here here ")
   const articles = await Article.findById(req.params.id);
  console.log(articles + 'here is the awaited id ')
   //console.log(req.articles + " article id")
    const store_id= req.user._id;
   // console.log(req.body._id + 'update')
    let article = await Article.findById(req.params.id);
    article.title = req.body.title;
    article.description = req.body.description;
    article.author= req.body.author;
    article.dateCreated = req.body.dateCreated;
    //article.dateCreated = req.body.dateCreated;
    console.log(article._id + " update");
    article.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
const storage = multer.memoryStorage(); // Store file in memory as Buffer

const upload = multer({ storage: storage });

exports.articleCreate = async (req, res) => {
  const { title, author, description, dateCreated, subDescription,file,genre } = req.body;
 console.log(title);
 console.log(file)
 console.log('df')
  try {
    const article = new Article({
      title: title,
      author: author,
      dateCreated: dateCreated,
      description: description,
      subDescription: subDescription,     //title.author.dateCreated.description.subDescription.file
      image:file,
      genre:genre,
    });
    console.log(title);
    console.log('fdfs')

    upload.single('file')(req, res, async err => {
      if (err) {
        console.error(err);
        return res.status(500).send('File upload error');
      }
      console.log('File uploaded successfully:', req.file);
      // File uploaded successfully, update the article with image data
      if (req.file) {
        article.image.data = req.file.buffer;
        article.image.contentType = req.file.mimetype;

        article.description = req.body.description;
        article.title = req.body.title;
        article.author = req.body.author;
        article.subDescription = req.body.subDescription;
        article.dateCreated =  req.body.dateCreated;
        article.genre =  req.body.genre;
        
        console.log("heres the logs")
        //console.log(article)
        console.log("heres the eend")
      }

      // Save the article to the database
      const savedArticle = await article.save();

      res.render('article', { message: 'new test', article: savedArticle, user:User });

    });

    // Handle file upload
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};