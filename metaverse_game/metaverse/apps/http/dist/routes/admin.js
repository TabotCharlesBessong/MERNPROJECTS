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
exports.adminRouter = void 0;
const client_1 = __importDefault(require("@repo/db/client"));
const express_1 = require("express");
const admin_1 = require("../middleware/admin");
const types_1 = require("../types");
exports.adminRouter = (0, express_1.Router)();
exports.adminRouter.use(admin_1.adminMiddleware);
exports.adminRouter.post("/element", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = types_1.CreateElementSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Validation failed" });
        return;
    }
    const element = yield client_1.default.element.create({
        data: {
            width: parsedData.data.width,
            height: parsedData.data.height,
            static: parsedData.data.static,
            imageUrl: parsedData.data.imageUrl,
        },
    });
    res.json({
        id: element.id,
    });
}));
exports.adminRouter.put("/element/:elementId", (req, res) => {
    const parsedData = types_1.UpdateElementSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Validation failed" });
        return;
    }
    client_1.default.element.update({
        where: {
            id: req.params.elementId,
        },
        data: {
            imageUrl: parsedData.data.imageUrl,
        },
    });
    res.json({ message: "Element updated" });
});
exports.adminRouter.post("/avatar", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = types_1.CreateAvatarSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Validation failed" });
        return;
    }
    const avatar = yield client_1.default.avatar.create({
        data: {
            name: parsedData.data.name,
            imageUrl: parsedData.data.imageUrl,
        },
    });
    res.json({ avatarId: avatar.id });
}));
exports.adminRouter.post("/map", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = types_1.CreateMapSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Validation failed" });
        return;
    }
    const map = yield client_1.default.map.create({
        data: {
            name: parsedData.data.name,
            width: parseInt(parsedData.data.dimensions.split("x")[0]),
            height: parseInt(parsedData.data.dimensions.split("x")[1]),
            thumbnail: parsedData.data.thumbnail,
            mapElements: {
                create: parsedData.data.defaultElements.map((e) => ({
                    elementId: e.elementId,
                    x: e.x,
                    y: e.y,
                })),
            },
        },
    });
    res.json({
        id: map.id,
    });
}));
