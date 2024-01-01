"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const error_validation_1 = __importDefault(require("../middlewares/error.validation"));
const product_validator_1 = require("../validators/product.validator");
const router = (0, express_1.Router)();
router.post('/login', product_validator_1.loginSchema, error_validation_1.default, user_controller_1.passwordLogin);
router.post('/registration', product_validator_1.registrationSchema, error_validation_1.default, user_controller_1.registration);
// router.post('/registration', registration); 
router.post('/verify-token', user_controller_1.verifyToken);
router.get('/all-user', user_controller_1.getUserList);
exports.default = router;
