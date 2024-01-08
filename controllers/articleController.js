const Article = require('../models/article')

exports.articleGet =  async(req,res)=>{
   // res.send('article gotten!')
   res.render('individarticle')
}
exports.articleDelete = async(req,res)=>{

    try {
        // Perform the deletion operation based on postId
        // ...
        await Article.findByIdAndDelete(req.params.id)
    
        const postId = req.params.id;
    
     //   res.json({ message: 'Article deleted successfully', deletedArticleId: postId }); could be?
      
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    res.redirect('/');
}

exports.articleUpdate = async(req,res,next)=>{
    req.article = await Article.findById(req.params.id);
    next();

 /*   try{
        const article = 
    }
    res.send('article update')*/
}
exports.articleCreate = async(req,res)=>{
    
    const{title,author,description,dateCreated} = req.body;
    try {
        
        const article = new Article({
            title: title, // Set the title property
            author:author,// Add other properties as needed
            description:description,
            dateCreated:dateCreated,
        });
        // Save the article to the database
        const savedArticle = await article.save();

      res.render('article', { message: 'new test', article: savedArticle });
    } catch (error) {
        // Handle errors, for example, send an error response
        res.status(500).send('Internal Server Error');
    }
}
