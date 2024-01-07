const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title:{
            type:String,
            required:true,
    },
    author:{
        type:String,    
        required:true
    },
    dateCreated:{
        type:Date,
        default:Date.now()
    },
    description:{
        type:String,
        required:true
    },
    published:{
        type:Boolean,
        default:false//set default to faulse for unpublished posts
    },
    image:{
        data:Buffer,
        contentType:String
    }
})
module.exports = mongoose.model('Article',articleSchema)