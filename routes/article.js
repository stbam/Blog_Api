const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController')




 
console.log("test");
/*router.get('/edit',(req,res)=>{
    res.send('test') //this works
}) */

router.delete('/:id',articleController.articleDelete)

router.get('/create',(req,res)=>{
    res.render('article')
})

/*router.get('/individarticle',(req,res)=>{
    res.render('individarticle')
})*/

router.get('/individarticle',articleController.articleGet)

router.put('/edit/:id',articleController.articleUpdate)

router.post('/create',articleController.articleCreate)

router.get('/edit',(req,res)=>{
   // const article = req.article;
   // res.render('edit',{article})
   res.render('edit')
})



/*
router.get('/edit/:id', (req, res) => {
    // Assuming req.article is populated in articleUpdate middleware
    const article = req.article;

    res.render('edit', { article });
});

*/

router.get('/',(req,res)=>{

})
router.get('/',(req,res)=>{
    res.render('article')
})

module.exports = router;