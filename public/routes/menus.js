const express = require('express');
const menu = express.Router(); // Creamos un enrutador
const db = require('../db');

// Ruta para obtener a todos los alimentos de la tabla alimentos
menu.get('/alimentos', (req, res) => {
    db.query('SELECT alimentos.id, alimentos.nombre, alimentos.precio, inventario.foto FROM alimentos JOIN inventario ON alimentos.id_inventario = inventario.id', (err, results) => { 
        if (err) {
            console.log(err);
            res.status(500).send("Error al obtener los alimentos");
        } else {
            res.json(results);
            console.log(results);
        }
    });
});

// Ruta para obtener a todas las bebidas de la tabla bebidas
menu.get('/bebidas', (req, res) => {
    db.query('SELECT bebidas.id, bebidas.nombre, bebidas.precio, inventario.foto FROM bebidas JOIN inventario ON bebidas.id_inventario = inventario.id', (err, results) => { 
        if (err) {
            console.log(err);
            res.status(500).send("Error al obtener las bebidas");
        } else {
            res.json(results);
            console.log(results);
        }
    });
});

module.exports = menu;
