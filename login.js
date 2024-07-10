const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');


const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Fabio007rios.',
    database: 'calculadoratm'
});

conexion.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos MySQL establecida');
});

const app = express();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function(request, response){
    response.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/auth', function(request, response){
    let username = request.body.username;
    let password = request.body.password;

    console.log('Username:', username);
    console.log('Password:', password);

    if (username && password) {
        conexion.query('SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?', [username, password], function(error, results, fields){
            if (error) {
                console.error('Error en la consulta:', error);
                response.status(500).send('Error en la base de datos');
            } else {
                if (results.length > 0) {
                    request.session.loggedin = true;
                    request.session.username = username;
                    response.status(200).json({ message: 'Inicio de sesión exitoso' });
                } else {
                    response.status(401).json({ error: 'Usuario o Contraseña incorrecto' });
                }
            }
        });
    } else {
        response.status(400).json({ error: 'Favor ingrese usuario y contraseña' });
    }
});


app.post('/register', function(request, response){
    let usuario = request.body.usuario;
    let nombre = request.body.nombre;
    let apellido = request.body.apellido;
    let email = request.body.email;
    let contrasena = request.body.contrasena;

    conexion.query('SELECT * FROM usuarios WHERE email = ?', [email], function(error, results, fields){
        if (error) {
            console.error('Error en la consulta:', error);
            response.status(500).json({ error: 'Error en la base de datos' });
        } else {
            if (results.length > 0) {
                response.status(409).json({ error: 'El correo electrónico ya está registrado' });
            } else {
                conexion.query('INSERT INTO usuarios (usuario, nombre, apellido, email, contrasena) VALUES (?, ?, ?, ?, ?)', 
                    [usuario, nombre, apellido, email, contrasena], function(error, results, fields){
                        if (error) {
                            console.error('Error al insertar usuario:', error);
                            response.status(500).json({ error: 'Error en la base de datos' });
                        } else {
                            response.status(200).json({ message: 'Usuario registrado correctamente' });
                        }
                    });
            }
        }
    });
});


app.get('/home', function(request, response) {
    if (request.session.loggedin && request.session.username) {
        response.sendFile(path.join(__dirname, 'index.html'));
    } else {
        response.send('Favor ingresa sesión para ver esta página!');
    }
});

app.get('/:page', (req, res) => {
    const page = req.params.page;
    res.sendFile(path.join(__dirname, `${page}`), (err) => {
        if (err) {
            console.error('Error al enviar el archivo:', err);
            res.status(err.status).send('Página no encontrada');
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
