const { errorMonitor } = require('events');
const { model } = require('mongoose');
const productos = require('../api/productos');
const products = require('../models/productos');
const faker = require('faker');

exports.getProducts = async(req, res) => {
    try {
        let allProducts = await products.find();
        if (allProducts == 0) {
            res.json({ error: 'no hay productos cargados' })
        } else {
            console.log(allProducts);
            res.json(allProducts)
        }
    } catch (error) {
        console.log(error)
    }
};

exports.getOneProduct = async(req, res) => {
    try {
        let product = await products.find({ name: req.params.name });
        if (product == null) {
            res.json({ error: 'producto no encontrado' })
        } else {
            console.log(product);
            res.json(product)
        }
    } catch (error) {
        console.log(error)
    }
};

exports.saveProduct = async(req, res) => {
    try {
        let prod = productos.guardar(req.body)
        let product = {
            name: prod.title,
            price: prod.price,
            thumbnail: prod.thumbnail
        }
        let productoModel = await products.create(product);
        console.log(productoModel);
        res.redirect('/')
    } catch (error) {
        console.log(error);
    }
};

exports.updateProduct = async(req, res) => {
    try {
        let product = await products.find({ name: req.params.name });
        if (product.length == 0) {
            res.json({ error: 'no se pudo actualizar el producto {name Erroneo}' })
        } else {
            let productUpdate = await products.updateOne({ name: req.params.name }, {
                $set: {
                    name: req.body.title,
                    price: req.body.price,
                    thumbnail: req.body.thumbnail
                }
            });
            console.log("actualizado!")
            res.json(productUpdate)
        }
    } catch (error) {
        console.log(error)
    }
};

exports.deleteProduct = async(req, res) => {
    try {
        let product = await products.find({ name: req.params.name });
        if (product.length == 0) {
            res.json({ error: 'no se pudo actualizar el producto {name Erroneo}' })
        } else {
            let productDelete = await products.deleteOne({ name: req.params.name });
            res.json(product)
        }
    } catch (error) {
        console.log(error)
    }
};

exports.testProducts = async(req, res) => {
    try {
        if(req.params.cant == 0){
            res.json({ error: 'no hay productos!'});
        }else{
            const cant = req.params.cant || 10;
            let productosCargados = [];
            for(let i = 0; i<cant; i++){
                let product = {
                    name: faker.commerce.product(),
                    price: faker.commerce.price(),
                    thumbnail: faker.image.image()
                };
                productosCargados.push(product)
            }
        console.log(productosCargados)
        res.json(productosCargados)
        }
    } catch (error) {
        console.log(error)
    }
}