const express = require('express');
const router = express.Router();
const pool = require('../database');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { exception } = require('console');
const mime = require('mime-types');

router.use(express.json());

router.get('/', async (req, res) => {
    const list_dir = await fs.readdir('allFiles', (err, archivos) => {
        var files = {};
        var folders = {};
        var contador = 1;
        archivos.forEach(element => {
            files[element] = {
                name: element,
                id: contador
            }
            contador++;
        });
        res.render('files/list', {file: files});
    }) //Poner en la carpeta del usuario
});



//subir archivos
const storage = multer.diskStorage({
    destination: 'allFiles', //Poner en la carpeta del usuario
    filename: function(req, file, cb){
        cb('', file.originalname.split('.')[0] + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

router.get('/upload', (req, res) => {
    res.render('files/upload');
});

router.post('/upload', upload.single('archivo'), (req, res) => {
    req.flash('success', 'Archivo subido correctamente');
    res.redirect('/files');
});
//terminar de subir

router.get('/delete/:id', async (req, res) => {
    const {id} = req.params;
    var contador = 1;
    await fs.readdir('allFiles', (err, archivos) => {
        archivos.forEach(element => {
            if(id == contador){
                fs.unlinkSync('allFiles/' + element);   
            }
            contador++;
        });
    });
    req.flash('success', 'Archivo borrado correctamente');
    res.redirect('/files/')
});

router.get('/download/:id', async (req, res) => {
    const {id} = req.params;
    var contador = 1;
    await fs.readdir('allFiles', (err, archivos) => {
        archivos.forEach(element => {
            if(id == contador){
                console.log(element);
                
                var file = 'allFiles/' + element;

                res.download(file);
            }
            contador++;
        });
    });
    req.flash('success', 'Descargado correctamente');
});



module.exports = router;