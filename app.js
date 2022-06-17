const { log } = require("console");
const { Contenedor } = require("./Contenedor");
const { Producto } = require("./Productos");

const contenedor = new Contenedor("productos.txt")

//hacer un array de objetos
const p1 = new Producto(0, "titulo1", 1111, "imagen_p_1.jpg")
const p2 = new Producto(0, "titulo2", 2222, "imagen_p_2.jpg")
const p3 = new Producto(0, "titulo3", 3333, "imagen_p_3.jpg")
const p4 = new Producto(0, "titulo4", 444, "imagen_p_4.jpg")

const listaProducto = [p1, p2, p3, p4]


async function crearDatos() {

    for (const p of listaProducto) {

        await contenedor.save(p)

    }

}

async function ProbarMetodos() {
    console.log("inicio crearDatos")
    await crearDatos()
    console.log("fin crearDatos")

    let resultadoAll = await contenedor.getAll()
    console.log("getAll: " + JSON.stringify(resultadoAll))

    let resultadoPorId = await contenedor.getById(3)
    console.log("getById: " + JSON.stringify(resultadoPorId))

    try {
        await contenedor.deleteById(3)
        console.log("deleteById: El producto ha sido borrado")
        resultadoAll = await contenedor.getAll()
        console.log("getAll: " + JSON.stringify(resultadoAll))
    } catch (error) {
        console.log("Error: " + error)
    }

    try {
        await contenedor.deleteAll()
        console.log("deleteAll: Los productos ha sido borrados")
    } catch (error) {
        console.log("Error: " + error)

    }
}

ProbarMetodos()






