const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isloggedIn, isNotLoggedIn } = require('../lib/auth');
const fs = require('fs');
const pool = require('../database');

router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup');
});


router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', isNotLoggedIn, (req, res) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res);
});

router.get('/profile', isloggedIn, async (req, res) => {
    var friends = {};
    var files = {};
    var invitaciones = {};
    const list_dir = await fs.readdir('allFiles/' + req.user.username, (err, archivos) => {
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
    res.render('profile', { file: files});
});

router.get('/logout', isloggedIn, (req, res) => {
    req.logOut();
    res.redirect('/signin');
});

module.exports = router;