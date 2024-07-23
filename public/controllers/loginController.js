
function index(req, res) {
    if (req.session.loggedin) {
          // Output username
      res.redirect('/');
      let name = req.session.name;
    } else {
      res.render('login/index');
    }
  }
  
  function register(req, res) {
    res.render('login/register');
  }
const db = require('../db');
  function auth(req, res) {
    let correo = req.body.correo;
    let pass = req.body.pass;

    db.query('SELECT * FROM login WHERE correo = ?', [correo], (err, rows) => {
        if (err) {
            console.error('Query error:', err);
            res.status(500).send('Internal server error');
            return;
        }

        if (rows.length > 0) {
            console.log(rows);
            req.session.loggedin = true;
            req.session.name = rows[0].name; // Ajusta esto según el campo correcto en tu base de datos
            res.redirect('/punto');
        } else {
            console.log('User not found');
            res.status(401).send('Authentication failed');
        }
    });
}

  function logout(req, res) {
    if (req.session.loggedin) {
      req.session.destroy();
    }
    res.redirect('/');
  }
  
  
  module.exports = {
    index: index,
    register: register,
    auth: auth,
    logout: logout,
  }