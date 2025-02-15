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
exports.userRouter = void 0;
const express_1 = require("express");
const types_1 = require("../types");
const client_1 = __importDefault(require("@repo/db/client"));
const user_1 = require("../middleware/user");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/metadata", user_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = types_1.UpdateMetadataSchema.safeParse(req.body);
    if (!parsedData.success) {
        console.log("parsed data incorrect");
        res.status(400).json({ message: "Validation failed" });
        return;
    }
    try {
        yield client_1.default.user.update({
            where: {
                id: req.userId,
            },
            data: {
                avatarId: parsedData.data.avatarId,
            },
        });
        res.json({ message: "Metadata updated" });
    }
    catch (e) {
        console.log("error");
        res.status(400).json({ message: "Internal server error" });
    }
}));
exports.userRouter.get("/metadata/bulk", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userIdString = ((_a = req.query.ids) !== null && _a !== void 0 ? _a : "[]");
    const userIds = userIdString.slice(1, (userIdString === null || userIdString === void 0 ? void 0 : userIdString.length) - 1).split(",");
    console.log(userIds);
    const metadata = yield client_1.default.user.findMany({
        where: {
            id: {
                in: userIds,
            },
        },
        select: {
            avatar: true,
            id: true,
        },
    });
    res.json({
        avatars: metadata.map((m) => {
            var _a;
            return ({
                userId: m.id,
                avatarId: (_a = m.avatar) === null || _a === void 0 ? void 0 : _a.imageUrl,
            });
        }),
    });
}));
