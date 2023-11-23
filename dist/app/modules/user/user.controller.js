"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const user_validation_1 = __importStar(require("./user.validation"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const parsedUserData = user_validation_1.default.parse(userData);
        const result = yield user_service_1.UserServices.createUserIntoDb(parsedUserData);
        res.status(201).json({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
        // eslint-disable-next-line
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: {
                code: 500,
                description: error.message,
            },
        });
    }
});
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserServices.getAllUserFromDb();
        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: result,
        });
        // eslint-disable-next-line
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: {
                code: 500,
                description: error.message,
            },
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req.params) === null || _a === void 0 ? void 0 : _a.userId;
        const result = yield user_service_1.UserServices.getSingleUserFromDb(parseFloat(id));
        if (result) {
            res.status(200).json({
                success: true,
                message: 'User fetched successfully!',
                data: result,
            });
        }
        // eslint-disable-next-line
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
            error: {
                code: 404,
                description: error.message,
            },
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const id = (_b = req.params) === null || _b === void 0 ? void 0 : _b.userId;
        const userData = req.body;
        const parsedUserData = user_validation_1.default.parse(userData);
        const result = yield user_service_1.UserServices.updateUserIntoDb(parseFloat(id), parsedUserData);
        if (result === null || result === void 0 ? void 0 : result.userData)
            res.status(200).json({
                success: true,
                message: 'User updated successfully!',
                data: result.userInfo,
            });
        // eslint-disable-next-line
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
            error: {
                code: 404,
                description: error.message,
            },
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const id = (_c = req.params) === null || _c === void 0 ? void 0 : _c.userId;
        const result = yield user_service_1.UserServices.deleteUserFromDb(parseFloat(id));
        if (result.deletedCount === 1) {
            res.status(200).json({
                success: true,
                message: 'User deleted successfully!',
                data: null,
            });
        }
        // eslint-disable-next-line
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
            error: {
                code: 404,
                description: error.message,
            },
        });
    }
});
const addNewProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const id = (_d = req.params) === null || _d === void 0 ? void 0 : _d.userId;
        const product = req.body;
        const parsedOrderData = user_validation_1.orderValidationSchema.parse(product);
        const result = yield user_service_1.UserServices.addNewProductIntoOrder(parseFloat(id), parsedOrderData);
        if (result.acknowledged === true) {
            res.status(200).json({
                success: true,
                message: 'Order created successfully!',
                data: null,
            });
        }
        // eslint-disable-next-line
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
            error: {
                code: 404,
                description: error.message,
            },
        });
    }
});
const getUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const id = (_e = req.params) === null || _e === void 0 ? void 0 : _e.userId;
        const result = yield user_service_1.UserServices.getUserOrdersFromDb(parseFloat(id));
        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: result,
        });
        // eslint-disable-next-line
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
            error: {
                code: 404,
                description: error.message,
            },
        });
    }
});
const getUserOrdersTotal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    try {
        const id = (_f = req.params) === null || _f === void 0 ? void 0 : _f.userId;
        const result = yield user_service_1.UserServices.getUserOrderTotalAmount(parseFloat(id));
        res.status(200).json({
            success: true,
            message: 'Total price calculated successfully!',
            data: result,
        });
        // eslint-disable-next-line
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
            error: {
                code: 404,
                description: error.message,
            },
        });
    }
});
exports.UserController = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
    addNewProduct,
    getUserOrders,
    getUserOrdersTotal,
};
