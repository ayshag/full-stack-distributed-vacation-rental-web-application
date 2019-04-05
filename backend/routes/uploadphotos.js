const multer = require('multer');
var filename = "";
var counter = 0;

var express = require('express');
var router = express.Router();

const storage = multer.diskStorage({

    destination: (req, file, callback) => {
        callback(null, './uploads');
    },
    filename: (req, file, callback) => {

        counter++;
        const newFilename = filename + '_photo' + counter + '.jpg';
        callback(null, newFilename);
    },
});
const upload = multer({ storage });


router.post('/setname', (req, res) => {
    filename = req.body.filename;
    console.log("Setting name: ", filename);
    res.end();
})

router.post('/', upload.array('images[]', 10), (req, res) => {
    console.log("Uploading Multiple Files");
    counter = 0;
    res.send();
});


module.exports =  router;