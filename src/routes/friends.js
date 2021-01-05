const express = require('express');
const router = express.Router();
const pool = require('../database');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { isloggedIn } = require('../lib/auth');
const { moveFile } = require('../lib/helpers');

router.use(express.json());
router.use(express.urlencoded({
    extended: true
}));

router.get('/search', isloggedIn, async (req, res) => {
    res.render('friends/search_friend');
});

router.post('/search', isloggedIn, async (req, res) => {
    const name = req.body.friend + '%'
    const slq = "SELECT * FROM users WHERE username LIKE '" + name + "';";
    const rows = await pool.query(slq);
    var persons = {};
    for (const element of rows) {
        const name = element.username;
        persons[name] = {
            username: name
        }
    }
    res.render('friends/search_friend', { person: persons });
});

router.get('/profile/:path', isloggedIn, async (req, res) => {
    const username = req.params.path;
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    var files = {};
    var friend = {};
    for (const element of rows) {
        const username = element.username;
        friend[username] = {
            username: username,
            fullname: element.fullname
        }
    }
    await fs.readdir('allFiles/' + username, (err, archivos) => {
        if (err) {
            console.log(err);
        }
        var contador = 1;
        const max_elements = 5;
        for (const element of archivos) {
            if (contador == max_elements) {
                break;
            }
            files[element] = {
                name: element,
                id: contador
            }
            contador++;
        }
    });
    res.render('friends/f_profile', { friend: friend, file: files });
});

router.get('/send/:id', isloggedIn, async (req, res) => {
    var file = '';
    var files = {};
    await fs.readdir('allFiles/' + req.user.username, (err, archivos) => {
        if (err) {
            console.log(err);
        }
        var contador = 1;
        for (const element of archivos) {
            if (contador == req.params.id) {
                file = 'allFiles/' + element;
                files[file] = {
                    id: contador
                }
                break;
            }
            contador++;
        }
    });
    res.render('friends/send', { files: files });
});

router.post('/send/:id', isloggedIn, async (req, res) => {
    const person = req.body.person;
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [person]);
    for (const element of rows) {
        res.redirect('/friends/send/' + element.username + '/' + req.params.id);
    }
});

router.get('/send/:user/:id', isloggedIn, async (req, res) => {
    var file = '';
    var name = '';
    await fs.readdir('allFiles/' + req.user.username, (err, archivos) => {
        if (err) {
            console.log(err);
        }
        var contador = 1;
        for (const element of archivos) {
            if (contador == req.params.id) {
                file = 'allFiles/' + req.user.username + '/' + element;
                name = element;
                break;
            }
            contador++;
        }

        moveFile(file, 'allFiles/' + req.params.user + '/' + name);

        req.flash('success', 'Archivo enviado correctamente');
        res.redirect('/profile');
    });
});

module.exports = router;