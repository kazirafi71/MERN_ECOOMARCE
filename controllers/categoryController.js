const { default: slugify } = require('slugify')
const Category=require('../models/CategoryModel')


module.exports.add_category_controller=(req,res,next)=>{
    let {category_name, parentId}=req.body 

    if(!category_name){
        return res.status(201).json({error: 'Please provide category name'})
    }
    let category__list={
        category_name,
        slug: slugify(category_name),
        createdAt: req.user._id

    }

    if(parentId){
        category__list.parentId=parentId
    }

    

    let category=new Category(category__list)
    category.save()
    .then(result=>{
        console.log(result)
        return res.status(201).json({result})
    })
    .catch(err=>{
        console.log(err)
        return res.status(401).json({error: "Already exist category"})
    })
   
    //console.log(category__list)

    
}

module.exports.get_category_controller=(req,res,next)=>{

    Category.find({})
    .then(result=>{
        return res.status(201).json({result})
    })
    .catch(err=>{
        console.log(err)
        return res.status(401).json({error: "Error occurred"})
    })
   
}