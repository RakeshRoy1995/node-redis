"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.registration = exports.getUserList = exports.passwordLogin = void 0;
const logger_1 = __importDefault(require("../config/logger"));
const User_Model_1 = __importDefault(require("../models/User.Model"));
const auth_hash_1 = require("../middlewares/auth-hash");
const error_util_1 = require("../utils/error.util");
var crypto = require('crypto');
const NAMESPACE = 'User Controller';
const passwordLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, email } = req.body;
        const data = yield User_Model_1.default.findOne({ 'email': email });
        var hash = (0, auth_hash_1.hashPassword)(password, data.salt);
        let collection = {};
        if ((data === null || data === void 0 ? void 0 : data.password) == hash) {
            collection.login = true;
            collection.user_email = data.email;
            collection.user_id = data._id;
            collection.user_name = data.name;
            let tokens = { email };
            const newToken = (0, auth_hash_1.tokenGenerator)(tokens);
            collection.api_token = newToken;
            const filter = { _id: data._id };
            const update = { api_token: newToken };
            yield User_Model_1.default.findOneAndUpdate(filter, update, {
                new: true
            });
        }
        else {
            collection.login = false;
        }
        return res.json(collection);
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, 'Create Product error', err);
        res.status(500).json((0, error_util_1.formatError)(err));
    }
});
exports.passwordLogin = passwordLogin;
const getUserList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_Model_1.default.find({}).select('_id email api_token');
        res.json({ data: users });
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, 'Error getting users');
        return res.status(500).json((0, error_util_1.formatError)('Server error'));
    }
});
exports.getUserList = getUserList;
// registration for customer and merchant
const registration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var verification_token = crypto.randomBytes(32).toString('hex');
        var salt = crypto.randomBytes(128).toString('hex');
        const { is_customer, name, phone, email, type, password } = req.body;
        const Hpassword = (0, auth_hash_1.hashPassword)(password, salt);
        // 1 =>Admin , 2=> merchant , 3=>customer
        if (type == '3') {
            const data = new User_Model_1.default({ salt, verification_token, is_customer, name, phone, email, type, password: Hpassword });
            yield data.save();
            res.status(200).json({ status: true, data });
        }
    }
    catch (errors) {
        logger_1.default.error(NAMESPACE, 'Create Product error', errors);
        res.status(500).json({ status: false, errors: errors });
    }
});
exports.registration = registration;
const verifyToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tokens } = req.body;
        let token = (0, auth_hash_1.tokenVarify)(tokens);
        if (token === null || token === void 0 ? void 0 : token.exp) {
            token.api_token = tokens;
        }
        else {
            token.api_token = "";
        }
        return res.json(token);
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, 'Create Product error', err);
        res.status(500).json((0, error_util_1.formatError)(err));
    }
});
exports.verifyToken = verifyToken;
