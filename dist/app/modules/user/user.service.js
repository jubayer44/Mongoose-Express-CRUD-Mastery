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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDb = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(user);
    return result;
});
const getAllUserFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({}, { username: 1, fullName: 1, age: 1, email: 1, address: 1 });
    return result;
});
const getSingleUserFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
});
const updateUserIntoDb = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const existsUser = yield user_model_1.User.isUserExists(id);
    if (!existsUser) {
        throw new Error('User not found');
    }
    const userData = yield user_model_1.User.updateOne({ userId: id }, user);
    const userInfo = yield user_model_1.User.findOne({ userId: id }, { _id: 0, orders: 0 });
    return { userData, userInfo };
});
const deleteUserFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existsUser = yield user_model_1.User.isUserExists(id);
    if (!existsUser) {
        throw new Error('User not found');
    }
    const result = yield user_model_1.User.deleteOne({ userId: id });
    return result;
});
const addNewProductIntoOrder = (id, product) => __awaiter(void 0, void 0, void 0, function* () {
    const existsUser = yield user_model_1.User.isUserExists(id);
    if (!existsUser) {
        throw new Error('User not found');
    }
    const result = yield user_model_1.User.updateOne({ userId: id }, { $addToSet: { orders: product } });
    return result;
});
const getUserOrdersFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existsUser = yield user_model_1.User.isUserExists(id);
    if (!existsUser) {
        throw new Error('User not found');
    }
    const result = yield user_model_1.User.findOne({ userId: id }, { orders: 1, _id: 0 });
    return result;
});
const getUserOrderTotalAmount = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existsUser = yield user_model_1.User.isUserExists(id);
    if (!existsUser) {
        throw new Error('User not found');
    }
    const result = yield user_model_1.User.aggregate([
        {
            $match: { userId: id },
        },
        {
            $unwind: '$orders',
        },
        {
            $group: {
                _id: null,
                totalPrice: { $sum: '$orders.price' },
            },
        },
        {
            $project: {
                _id: 0,
                totalPrice: 1,
            },
        },
    ]);
    return result;
});
exports.UserServices = {
    createUserIntoDb,
    getAllUserFromDb,
    getSingleUserFromDb,
    updateUserIntoDb,
    deleteUserFromDb,
    addNewProductIntoOrder,
    getUserOrdersFromDb,
    getUserOrderTotalAmount,
};
