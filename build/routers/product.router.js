"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer = require("multer");
const product_controller_1 = require("../controllers/product.controller");
const access_control_middleware_1 = require("../middlewares/access-control.middleware");
const product_validator_1 = require("../validators/product.validator");
const router = (0, express_1.Router)();
// storage used with Multer library to define where to save files on server, and how to save filename
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../uploads');
    },
    filename: function (req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, file.originalname + '-' + Date.now() + '-' + getExtension(file));
        }
        else {
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
function getExtension(file) {
    var res = '';
    if (file.mimetype === 'image/jpeg')
        res = '.jpg';
    if (file.mimetype === 'image/png')
        res = '.png';
    return res;
}
var upload = multer({
    storage: storage,
    // limits: { fileSize: 1048576, files: 1 } // limit file size to 1048576 bytes or 1 MB
    //,fileFilter: // TODO limit types of files. currently can upload a .txt or any kind of file into uploads folder
}).fields([
    { name: "image", maxCount: 1 } // in <input name='fileName' />
]);
router.put('/update', upload, product_validator_1.updateProductSchema, access_control_middleware_1.verifyToken, product_controller_1.updateProduct);
router.post('/create', upload, product_validator_1.loginSchema, access_control_middleware_1.verifyToken, product_controller_1.createProduct);
router.get('/', product_controller_1.getAllProduct);
router.get('/:id', product_controller_1.singleProduct);
router.delete('/:id', access_control_middleware_1.verifyToken, product_controller_1.deleteProduct);
exports.default = router;
