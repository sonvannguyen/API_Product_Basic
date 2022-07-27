const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ProductSchema = new Schema({
    imgUrl : {
        type: String,
        required: true
    },
    name: {
        type:String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

// define index cho filed name -> for search
ProductSchema.virtual('id').get(function() {
    return this._id.toHexString();
  });
  
ProductSchema.set('toJSON', {
    virtuals: true
});
// ProductSchema.index({name: 'text'})
const ProductModel = mongoose.model('Product', ProductSchema)
// create index
// ProductModel.createIndexes({name: 'text'})

module.exports = ProductModel
