const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const loginRoutes = require('./public/routes/login');
const menu = require('./public/routes/menus');
const path = require('path');

const app = express();

const db = require('./public/db'); // exportamos la conexión del archivo db.js


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Usa las rutas de login
app.use('/', loginRoutes);
app.use('/', menu);


app.get('/punto', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/punto.html')); 
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/register.html')); 
});

app.get('/user-info', (req, res) => {
    if (req.session.loggedin) {
        res.json({ name: req.session.name });
    } else {
        res.status(401).json({ error: 'Not logged in' });
    }
});
app.get('/get-data', (req, res) => {
    db.query('SELECT id_producto, cantidad_producto, nombre_producto, precio_producto, total_precio FROM carrito', (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Server Error');
        return;
      }
      res.json(results);
    });
  });

// Definimos el puerto de escucha
const port = 3000;
app.listen(port, () => {
    console.log(`Server corriendo en http://localhost:${port}`);
});


app.get('/', (req, res) => {
	if (req.session.loggedin) {
		let name = req.session.name;

 		res.render('index', { name });
	} else {
		res.redirect('/login');
	}
});