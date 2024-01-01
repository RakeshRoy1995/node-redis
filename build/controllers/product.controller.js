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
exports.getAllProduct = exports.deleteProduct = exports.singleProduct = exports.updateProduct = exports.createProduct = void 0;
const logger_1 = __importDefault(require("../config/logger"));
const Product_model_1 = __importDefault(require("../models/Product.model"));
const error_util_1 = require("../utils/error.util");
const NAMESPACE = 'Product Controller';
// Create Categories
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, description, price, status } = req.body;
        const newCategorie = new Product_model_1.default({ name, description, price, status, image: (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.image[0].filename });
        yield newCategorie.save();
        res.json({ success: true, newCategorie });
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, 'Create Product error', err);
        res.status(500).json((0, error_util_1.formatError)(err));
    }
});
exports.createProduct = createProduct;
// Update Product
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        const { id, name, description, price, status } = req.body;
        const categorieFound = yield Product_model_1.default.findById(id);
        if (!categorieFound) {
            return res.status(404).json((0, error_util_1.formatError)('Product not found'));
        }
        const to_update = {
            name,
            description,
            price,
            status,
        };
        console.log("req?.files", req === null || req === void 0 ? void 0 : req.files, req.body);
        if ((_b = req === null || req === void 0 ? void 0 : req.files) === null || _b === void 0 ? void 0 : _b.image) {
            to_update.image = (_c = req === null || req === void 0 ? void 0 : req.files) === null || _c === void 0 ? void 0 : _c.image[0].filename;
        }
        yield Product_model_1.default.findByIdAndUpdate(id, to_update);
        res.json({ success: true });
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, 'Update Product error', err);
        res.status(500).json((0, error_util_1.formatError)('Server error'));
    }
});
exports.updateProduct = updateProduct;
// View Single Product
const singleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const productFound = yield Product_model_1.default.findById(id);
        if (!productFound) {
            return res.status(404).json((0, error_util_1.formatError)('No Product found'));
        }
        res.json(productFound);
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, 'View single categorie error', err);
        res.status(500).json((0, error_util_1.formatError)('Server error'));
    }
});
exports.singleProduct = singleProduct;
// delete Single Product
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const categorieFound = yield Product_model_1.default.findById(id);
        if (!categorieFound) {
            return res.status(404).json((0, error_util_1.formatError)('No Product found'));
        }
        yield Product_model_1.default.findByIdAndDelete(id);
        res.json({ msg: 'success' });
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, 'View single categorie error', err);
        res.status(500).json((0, error_util_1.formatError)('Server error'));
    }
});
exports.deleteProduct = deleteProduct;
// Get All Products
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const published = req.query.published;
        if (published === 'true') {
            const today = new Date().toISOString();
            const data = yield Product_model_1.default.find({ publish: true }).sort({ date: 'asc' });
            return res.json(data);
        }
        else {
            const data = yield Product_model_1.default.find({}).sort({ date: 'asc' });
            return res.json(data);
        }
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, 'View all data error', err);
        res.status(500).json((0, error_util_1.formatError)('Server error'));
    }
});
exports.getAllProduct = getAllProduct;
