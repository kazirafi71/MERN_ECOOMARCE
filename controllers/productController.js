var slugify = require('slugify')
const Product = require('../models/ProductModel')

module.exports.add_product_controller = (req, res, next) => {
    let {
        product_name,
        price,
        quantity,
        description,
        product_category
    } = req.body

    console.log(product_name,
        price,
        quantity,
        description,
        product_category)

    if (!product_name ||
        !price ||
        !quantity ||
        !description || !product_category) {
        return res.status(201).json({
            error: "Please provide all info"
        })
    }

    let product__info = {
        product_name,
        price,
        quantity,
        description,
        slug: slugify(product_name),
        createdAt: req.user._id,
        product_category,
        product_img: req.file.originalname
    }
    // if(req.file || req.files){
    //     product__info.product_img= req.file.originalname
    // }

    //console.log(product__info)



    // let pic = []
    // for (let i = 0; i < req.files.length; i++) {
    //     pic.push(req.files[i].filename)
    //     console.log(req.files[i].filename)
    // }
    // console.log(pic)

    // if (req.file || req.files) {
    //     product__info.product_img = req.file.filename
    // }
    //console.log(req.file.filename)

    let product = new Product(product__info)
    product.save()
        .then(result => {
            return res.status(201).json({
                result
            })
        })
        .catch(err => {
            console.log(err)
            return res.status(401).json({
                error: "Server error",
                err
            })
        })


}


module.exports.get_product_controller = (req, res, next) => {

    Product.find({})
        .then(result => {
            return res.status(201).json({
                result
            })
        })
        .catch(err => {
            console.log(err)
            return res.status(401).json({
                error: "Server error",
                err
            })
        })
}


module.exports.delete_product_controller = (req, res, next) => {
    let {
        postId
    } = req.body
    console.log(postId)

    Product.findOneAndDelete({
            _id: postId
        })
        .then(result => {
            return res.status(201).json({
                result
            })
        })
        .catch(err => {
            console.log(err)
            return res.status(401).json({
                error: "Server error",
                err
            })
        })
}

module.exports.update_product_controller = async (req, res, next) => {
    let {
        product_name,
        price,
        quantity,
        description,
        product_category
    } = req.body



    let {
        postId
    } = req.params
    //console.log(postId)



    let product__info = {
        product_name,
        price,
        quantity,
        description,
        slug: slugify(product_name),
        createdAt: req.user._id,
        product_category,
        product_img: req.file.originalname
    }
    console.log(product__info)

    let data = await Product.findByIdAndUpdate({
        _id: postId
    }, {
        $set: {
            product_name,
            price,
            quantity,
            description,
            slug: slugify(product_name),
            createdAt: req.user._id,
            product_category,
            product_img: req.file.originalname
        }
    }, {
        new: true
    })

    try {
        return res.status(201).json({
            result: data
        })
    } catch (error) {
        console.log(error)
    }
}


module.exports.getone_product_controller = (req, res, next) => {
    let {
        postId
    } = req.params
    console.log(postId)



    Product.findOne({
            _id: postId
        })
        .then(result => {
            return res.status(201).json({
                result
            })
        })
        .catch(err => {
            console.log(err)
        })


}