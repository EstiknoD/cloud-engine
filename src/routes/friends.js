const express = require('express');
const router = express.Router();
const pool = require('../database');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { isloggedIn } = require('../lib/auth');

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
    res.render('friends/search_friend', {person: persons});
});

router.get('/profile/:path', isloggedIn, async (req, res) => {
    const username = req.params.path;
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    var files = {};
    var friend = {};
    for(const element of rows){
        const username = element.username;
        friend[username] = {
            username: username,
            fullname: element.fullname
        }
    }
    await fs.readdir('allFiles/' + username, (err, archivos) => {
        if(err){
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
    res.render('friends/f_profile', {friend: friend, file: files});
});

module.exports = router;