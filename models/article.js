const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  dateCreated: {   
    type: Date,
    default: Date.now(),
    
  },
  description: {
    type: String,
    required: false,
  },
  subDescription:{
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    default: false, //set default to faulse for unpublished posts
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  genre:{
    type: String,
    required: true,
  } 
  
});

articleSchema.virtual("cleanedDate").get(function () {
  return DateTime.fromJSDate(this.dateCreated).toISODate(); // format 'YYYY-MM-DD'
});


module.exports = mongoose.model("Article", articleSchema);
