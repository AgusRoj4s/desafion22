const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const productos = require('../api/productos');

module.exports = () => {
    router.get('/productos/vista', (req, res) => {
        let prod = productos.listar();
        if (prod == 0) res.render('main', { productos: productos.listar(), hayProductos: false });
        else res.render('main', { productos: productos.listar(), hayProductos: true });
    });

    router.get('/productos/listar', productController.getProducts);
    router.get('/productos/listar/:name', productController.getOneProduct);
    router.post('/productos/guardar', productController.saveProduct);
    router.put('/productos/actualizar/:name', productController.updateProduct);
    router.delete('/productos/borrar/:name', productController.deleteProduct);

    return router;
};