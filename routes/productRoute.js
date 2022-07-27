const router = require('express').Router()
const productCtrl = require('../controllers/productCtrl')
    
router.route('/products')
    .get(productCtrl.getProducts)
    .post(productCtrl.addProduct)

router.route('/products/:productId')
    .get(productCtrl.getProductbyId)
    .put(productCtrl.updateProduct)
    .delete(productCtrl.deleteProduct)


module.exports = router