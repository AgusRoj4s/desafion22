class Productos {
    constructor() {
        this.productos = []
    }
    guardar(producto) {
        producto.id = this.productos.length + 1
        this.productos.push(producto)
        console.log(producto)
        return producto
    }
    listar() {
        if (this.productos.length == 0) {
            return 0
        } else {
            return this.productos
        }
    }
    listarID(id) {
        if (this.productos[id - 1] != null) {
            return this.productos[id - 1]
        } else {
            return 0
        }
    }

    actualizar(idProd, product) {
        let result = this.listarID(idProd)
        if (result == 0) {
            return 0
        } else {
            this.productos[idProd - 1].title = product.title
            this.productos[idProd - 1].price = product.price
            this.productos[idProd - 1].thumbnail = product.thumbnail
            return this.productos[idProd - 1]
        }
    }

    eliminar(idProd) {
        let result = this.listarID(idProd)
        if (result == 0) {
            return 0
        } else {
            delete this.productos[idProd]
            return result
        }
    }
}

// exporto una instancia de la clase
module.exports = new Productos();