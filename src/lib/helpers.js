const bcrypt = require('bcryptjs');
const multer = require('multer');
const fs = require('fs');
const { COPYFILE_EXCL } = fs.constants;

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

helpers.moveFile = async (file, dest) => {
    fs.copyFile(file, dest, COPYFILE_EXCL, (err) => {
        if(err){
            console.log(err);
        }
    });
}

module.exports = helpers;