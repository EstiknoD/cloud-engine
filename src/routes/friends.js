const express = require('express');
const router = express.Router();
const pool = require('../database');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {isloggedIn} = require('../lib/auth');

router.use(express.json());

router.get('/', isloggedIn, async (req, res) => {
    const rows = await pool.query('SELECT * FROM friends WHERE friend_id = ?', [req.user.id])
    const friends = [];
    if(rows.length > 0){
        for(const element of rows){
            const name = element.username;
            friends.name = {
                username: name,
                fullname: element.fullname
            }
        }
    }
    res.render('friends/friends', {friend: friends});
});

router.get('/search', isloggedIn, async (req, res) => {
    res.render('friends/search_friend');
});

router.post('/search', isloggedIn, async (req, res) => {
    console.log(req.body.friend);
    const name = req.body.friend + '%'
    const slq = "SELECT * FROM users WHERE username LIKE " + name + "';";
    console.log(slq);
    const rows = await pool.query(slq);
    var persons = [];
    if(rows => 0){
        for(const element of rows){
            console.log(element);
        }
    }
    //Enviar la informacion al frontend
    res.redirect('/friends/search');
});

module.exports = router;