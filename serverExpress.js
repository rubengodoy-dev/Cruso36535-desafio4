const { Contenedor } = require("./Contenedor");
const { Producto } = require("./Productos");

const contenedor = new Contenedor("productos.txt")

const port = 8080
const express = require("express")

const app = express()

app.get("/", (req, res) => {
    res.end("get ok")
})
app.get("/productos", async (req, res) => {

    let resultadoAll = await contenedor.getAll()
    res.end(JSON.stringify(resultadoAll))
})

app.get("/productoRandom", async (req, res) => {
    let resultadoAll = await contenedor.getAll()

    let indiceR = Math.floor(Math.random() * resultadoAll.length)

    res.end(JSON.stringify(resultadoAll[indiceR]))
})

const server = app.listen(port, () => {
    console.log(`conectado http escuchando en ${server.address().port}`);
})

server.on("error", error => console.error(`Error en servidor  ${error}`))