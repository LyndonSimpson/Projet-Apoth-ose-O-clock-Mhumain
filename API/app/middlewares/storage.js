const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../../projet-04-adopte-ton-mhumain/API/public');
    },
    filename: (req, file, cb) => {
        //console.log(file)
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

module.exports = storage;

