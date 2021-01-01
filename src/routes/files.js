const express = require('express');
const router = express.Router();
const pool = require('../database');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {isloggedIn} = require('../lib/auth');

router.use(express.json());

router.get('/', isloggedIn, async (req, res) => {
    const list_dir = await fs.readdir('allFiles/' + req.user.username, (err, archivos) => {
        var files = {};
        var contador = 1;
        for(const element of archivos){
            files[element] = {
                name: element,
                id: contador
            }
            contador++;
        }
        res.render('files/list', {file: files});
    }) //Poner en la carpeta del usuario
});



//subir archivos

const storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb('', 'allFiles/' + req.user.username);
    },
    filename: function(req, file, cb){
        cb('', file.originalname.split('.')[0] + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

router.get('/upload', isloggedIn, (req, res) => {
    res.render('files/upload');
});

router.post('/upload', upload.single('archivo'), isloggedIn, (req, res) => {
    req.flash('success', 'Archivo subido correctamente');
    res.redirect('/files');
});
//terminar de subir

router.get('/delete/:id', isloggedIn, async (req, res) => {
    const {id} = req.params;
    var contador = 1;
    await fs.readdir('allFiles/' + req.user.username, (err, archivos) => {
        archivos.forEach(element => {
            if(id == contador){
                fs.unlinkSync('allFiles/' + req.user.username + '/' + element);   
            }
            contador++;
        });
    });
    req.flash('success', 'Archivo borrado correctamente');
    res.redirect('/files')
});

router.get('/download/:id', isloggedIn, async (req, res) => {
    const {id} = req.params;
    var contador = 1;
    await fs.readdir('allFiles/' + req.user.username, (err, archivos) => {
        archivos.forEach(element => {
            if(id == contador){
                console.log(element);
                
                var file = 'allFiles/' + req.user.username + '/' + element;

                res.download(file);
            }
            contador++;
        });
    });
    req.flash('success', 'Descargado correctamente');
});



module.exports = router;