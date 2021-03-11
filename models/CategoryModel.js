const mongoose=require('mongoose');



const categorySchema=mongoose.Schema({
    category_name: {
        type: String,
        required: true
    },

    slug:{
        type: String, 
        required: true, 
        unique: true 
    },
    parentId:{
        type: String,

    },
    createdAt:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })


const Category= mongoose.model('Category',categorySchema)

module.exports=Category