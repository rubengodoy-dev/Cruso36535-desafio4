const fs = require("fs")

const { Producto } = require("./Productos")

class Contenedor {
    constructor(nombreArchivo) {
        this.nombre = nombreArchivo
    }

    async save(producto) {
        const listaProductos = await this.getAll()      
        let id = 0
      
        if (listaProductos.length > 0) {
            //obtener el ultimo Id          
            id = Math.max(...listaProductos.map(p => p.id))     
        }
        id++       
        producto.id=id
        listaProductos.push(producto)   

        try {
            await fs.promises.writeFile(this.nombre, JSON.stringify(listaProductos))
        } catch (err) {
            console.log(`Error al escribir el archivo: ${err}`)
        }

    }

    async getById(id) {
        const listaProductos = await this.getAll() 
        const producto= listaProductos.find(p=>p.id==id)

        if (producto===undefined) {
           return null
        }
        else
        {
            return producto
        }
        
    }

    async getAll() {

        try {
            const contenido = await fs.promises.readFile(this.nombre, "utf-8")
            const listaProductos = JSON.parse(contenido)
            return listaProductos
        }
        catch (err) {
            console.log(`Error al leer el archivo: ${err}`)
        }


    }

   async deleteById(id) {
        let listaProductos = await this.getAll() 
        listaProductos = listaProductos.filter(p => p.id != id)

        try {
            await fs.promises.writeFile(this.nombre,JSON.stringify(listaProductos))
        } catch (err) {
            console.log(`Error al escribir el archivo: ${err}`)
        }

    }

   async deleteAll() {
        try {
            await fs.promises.writeFile(this.nombre,JSON.stringify([]))
        } catch (err) {
            console.log(`Error al escribir el archivo: ${err}`)
        }

    }

}
module.exports = {
    Contenedor
}