const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController')


router.delete('/:id',articleController.articleDelete)

router.get('/create',(req,res)=>{
    res.render('article')
})

router.get('/individarticle',(req,res)=>{
    res.render('individarticle')
})

router.get('/edit',articleController.articleGet)


router.put('/edit/:id',articleController.articleUpdate)

router.post('/create',articleController.articleCreate)


//////////////////////////// ////////////////////////////////////////////////////////////////////////////////////



router.get('/article/individarticle', (req, res) => {
    res.render('individarticle')  
});


router.get('/',(req,res)=>{
    res.render('article')
})

module.exports = router;