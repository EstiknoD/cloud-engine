const bcrypt = require('bcryptjs');
const multer = require('multer');

const helpers = {};

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
    try{
        return await bcrypt.compare(password, savedPassword);
    }
    catch(e){
        console.log(e);
    }
};

helpers.upload = async (req, username, file) => {
    const storage = multer.diskStorage({
        destination: 'allFiles/' + username, //Poner en la carpeta del usuario
        filename: function(req, file, cb){
            cb('', file.originalname.split('.')[0] + path.extname(file.originalname));
        }
    });
    
    const upload = multer({
        storage: storage
    });

}

module.exports = helpers;