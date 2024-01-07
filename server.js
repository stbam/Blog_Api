const express = require('express');
const app = express();
const Article = require('./models/article')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/newdb')

app.use(express.json());

app.set('view engine','ejs');
app.use(express.urlencoded({ extended: true }));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));


const articleRouter = require('./routes/article')
app.use('/article',articleRouter);



app.get('/',async(req,res)=>{
    articles = await Article.find({})
    
    console.log(articles)
    res.render('index',{articles:articles})
})





app.listen(5005)