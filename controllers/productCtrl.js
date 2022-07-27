const ProductModel = require('../models/ProductModel')
const APIfeatures = require('../feature/query')
const productCtrl = {
    getProducts: async(req, res, next) => {
        try {
            const features = new APIfeatures(ProductModel.find(), req.query).paginating().sorting().searching().filtering()
            // Promise.allSettled thực hiện các hàm bất đồng bộ cùng lúc khi chúng k phụ thuộc nhau
            const result = await Promise.allSettled([
                features.query,
                ProductModel.countDocuments() //count number of products.
              ])
              
              const products = result[0].status === 'fulfilled' ? result[0].value : [];
              const count = result[1].status === 'fulfilled' ? result[1].value : 0;
        
            return res.status(200).json({
                totalProducts: count,
                products
            })
        } catch (error) {
            next(error)
        }
    },
    addProduct: async(req, res, next) => {
        try {
            const {imgUrl, name, price} = req.body
            const newProduct = new ProductModel({
                imgUrl, name, price
            })
            await newProduct.save()
            return res.status(200).json(newProduct)
        } catch (error) {
            next(error)            
        }
    },
    getProductbyId: async(req, res, next) => {
        try {
            const product = await ProductModel.findById(req.params.productId)
            if(!product){
                return res.status(404).json('Product does not exist')
            }
            return res.status(200).json(product)
        } catch (error) {
            next(error)
        }
    },
    updateProduct: async(req, res, next) => {
        try {
            const {imgUrl, name, price} = req.body
            const newProduct = await ProductModel.findByIdAndUpdate(req.params.productId, {
                imgUrl, name, price
            }, {new: true})
            if(!newProduct){
                return res.status(404).json('Product does not exist')
            }
            return res.status(200).json(newProduct)
        } catch (error) {
            next(error)
        }
    },
    deleteProduct: async(req, res, next) => {
        try {
            const product = await ProductModel.findByIdAndDelete(req.params.productId)
            if(!product){
                return res.status(404).json('Product does not exist')
            }
            return res.status(200).json('Delete success!')
        } catch (error) {
            next(error)
        }
    }
}

module.exports = productCtrl