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
exports.router = void 0;
const client_1 = __importDefault(require("@repo/db/client"));
const express_1 = require("express");
const types_1 = require("../types");
const scrypt_1 = require("../scrypt");
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("./user");
const space_1 = require("./space");
const admin_1 = require("./admin");
exports.router = (0, express_1.Router)();
exports.router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Inside signup, received body:", req.body);
    // Parse request data
    const parsedData = types_1.SignupSchema.safeParse(req.body);
    if (!parsedData.success) {
        console.log("Validation Error:", parsedData.error.format()); // Log formatted error
        res.status(400).json({
            message: "Validation failed",
            errors: parsedData.error.format(),
        });
        return;
    }
    const hashedPassword = yield (0, scrypt_1.hash)(parsedData.data.password);
    try {
        const user = yield client_1.default.user.create({
            data: {
                username: parsedData.data.username,
                password: hashedPassword,
                role: parsedData.data.type === "admin" ? "Admin" : "User",
            },
        });
        res.status(200).json({ userId: user.id });
    }
    catch (e) {
        console.log("Error thrown:", e);
        res.status(400).json({ message: "User already exists" });
    }
}));
exports.router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = types_1.SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(403).json({ message: "Validation failed" });
        return;
    }
    try {
        const user = yield client_1.default.user.findUnique({
            where: {
                username: parsedData.data.username,
            },
        });
        if (!user) {
            res.status(403).json({ message: "User not found" });
            return;
        }
        const isValid = yield (0, scrypt_1.compare)(parsedData.data.password, user.password);
        if (!isValid) {
            res.status(403).json({ message: "Invalid password" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
            role: user.role,
        }, config_1.JWT_PASSWORD);
        res.json({
            token,
        });
    }
    catch (e) {
        res.status(400).json({ message: "Internal server error" });
    }
}));
exports.router.get("/elements", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const elements = yield client_1.default.element.findMany();
    res.json({
        elements: elements.map((e) => ({
            id: e.id,
            imageUrl: e.imageUrl,
            width: e.width,
            height: e.height,
            static: e.static,
        })),
    });
}));
exports.router.get("/avatars", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const avatars = yield client_1.default.avatar.findMany();
    res.json({
        avatars: avatars.map((x) => ({
            id: x.id,
            imageUrl: x.imageUrl,
            name: x.name,
        })),
    });
}));
exports.router.use("/user", user_1.userRouter);
exports.router.use("/space", space_1.spaceRouter);
exports.router.use("/admin", admin_1.adminRouter);
