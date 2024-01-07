const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController')




 
console.log("test");
router.delete('/:id',articleController.articleDelete)
router.get('/create',(req,res)=>{
    res.render('article')
})

/*router.get('/individarticle',(req,res)=>{
    res.render('individarticle')
})*/

router.get('/individarticle',articleController.articleGet)

router.put('/:id',articleController.articleUpdate)

router.post('/create',articleController.articleCreate)


router.get('/',(req,res)=>{

})
router.get('/',(req,res)=>{
    res.render('article')
})

module.exports = router;