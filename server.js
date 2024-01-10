const express = require("express");
const app = express();
const Article = require("./models/article");



const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://stbacmtd:Stru5932@cluster0.jw02qwx.mongodb.net/?retryWrites=true&w=majority");

app.use('/stylesheets', express.static('public/stylesheets'));
app.use('/assets', express.static('assets'));
app.use(express.json());


const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const articleRouter = require("./routes/article");
app.use("/article", articleRouter);

app.get("/", async (req, res) => {
  articles = await Article.find({});

  // console.log(articles)
  res.render("index", { articles: articles });
});

app.listen(5005);
