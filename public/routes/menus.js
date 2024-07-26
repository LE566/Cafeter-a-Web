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

menu.get('/snacks', (req, res) => {
    db.query('SELECT snacks.id, snacks.nombre, snacks.precio, inventario.foto FROM snacks JOIN inventario ON snacks.id_inventario = inventario.id', (err, results) => { 
        if (err) {
            console.log(err);
            res.status(500).send("Error al obtener las snacks");
        } else {
            res.json(results);
            console.log(results);
        }
    });
});

// menu.post('/insert-food', (req, res) => {
//     const { id_producto, nombre_producto, cantidad_producto, precio_producto, total_precio } = req.body;

//     const sql = `INSERT INTO carrito (id_producto, nombre_producto, cantidad_producto, precio_producto, total_precio) VALUES (?, ?, ?, ?, ?)`;

//     const valores = [id_producto, nombre_producto, cantidad_producto, precio_producto, total_precio];

//     connection.query(sql, valores, (err, result) => {
//         if (err) {
//             console.error('Error al insertar los datos:', err);
//             res.status(500).send('Error al insertar los datos.');
//         } else {
//             res.status(200).send('Datos insertados correctamente.');
//             console.log(result);
//         }
//     });
// });

// menu.get('/get-food/:id', (req, res) => {
//     const foodId = req.params.id;

//     req.getConnection((err, connection) => {
//         if (err) return res.status(500).json({ error: 'Error en la conexión a la base de datos' });

//         const query = 'SELECT * FROM alimentos WHERE id = ?';
//         connection.query(query, [foodId], (err, results) => {
//             if (err) return res.status(500).json({ error: 'Error al obtener la información del alimento' });

//             res.json(results[0]); // Devuelve la información del primer resultado
//         });
//     });
// });





menu.post('/insert-food-to-cart', (req, res) => {
    const foodId = req.body.id;

    req.getConnection((err, connection) => {
        if (err) return res.status(500).json({ success: false, message: 'Error en la conexión a la base de datos' });

        // Verificar si el alimento existe en la tabla alimentos
        const queryCheck = 'SELECT * FROM alimentos WHERE id = ?';
        connection.query(queryCheck, [foodId], (err, results) => {
            if (err) return res.status(500).json({ success: false, message: 'Error al verificar el alimento en la base de datos' });

            if (results.length > 0) {
                // Si el alimento existe, insertarlo en la tabla carrito
                const queryInsert = 'INSERT INTO carrito (food_id) VALUES (?)';
                connection.query(queryInsert, [foodId], (err, results) => {
                    if (err) return res.status(500).json({ success: false, message: 'Error al insertar el alimento en el carrito' });

                    res.json({ success: true, message: 'Alimento añadido al carrito' });
                });
            } else {
                res.status(404).json({ success: false, message: 'El alimento no existe en la base de datos' });
            }
        });
    });
});
module.exports = menu;
