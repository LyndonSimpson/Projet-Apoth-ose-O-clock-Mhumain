const path = require('path');
const multer = require('multer');

//../../projet-04-adopte-ton-mhumain/front/mhuman/public  --- pour ranger en front!
//../../projet-04-adopte-ton-mhumain/API/public ----- pour ranger en back!


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../../projet-04-adopte-ton-mhumain/front/mhuman/public');
    },
    filename: (req, file, cb) => {
        //console.log(file)
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

module.exports = storage;

