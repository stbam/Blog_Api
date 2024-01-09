const Article = require("../models/article");

/*exports.articleGet =  async(req,res)=>{
   // res.send('article gotten!')
   const articles = await Article.findOne(req.params.id)
   

   res.render('individarticle',{article:articles})
}  */

exports.articleGet = async (req, res) => {
  const articles = await Article.findOne(req.params.id);
console.log('test')
  res.render("edit", { article: articles });
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
  let article = await Article.findById(req.params.id);
  try {
    article.title = req.body.title;
    article.description = req.body.description;
    article.author= req.body.author;
    article.dateCreated = req.body.dateCreated;
    //article.dateCreated = req.body.dateCreated;
   


    console.log(article + "update");

    article.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
exports.articleCreate = async (req, res) => {
  const { title, author, description, dateCreated,subDescription } = req.body;
  try {
    const article = new Article({
      title: title, // Set the title property
      author: author, // Add other properties as needed
      description: description,
      dateCreated: dateCreated,
      subDescription:subDescription
    });
    // Save the article to the database
    const savedArticle = await article.save();
 //   res.redirect('/')                           /*BAD FIX IT LATER*/
    res.render("article", { message: "new test", article: savedArticle });
    
  } catch (error) {
    // Handle errors, for example, send an error response
    res.status(500).send("Internal Server Error");
  }
  
};
