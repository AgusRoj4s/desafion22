const mongoose = require('mongoose')

const ProductoSchema = mongoose.Schema({
    name: { type: String, require: true, max: 100 },
    price: { type: String, require: true },
    thumbnail: { type: String, require: true }
});

const Products = mongoose.model('products', ProductoSchema);
module.exports = Products;