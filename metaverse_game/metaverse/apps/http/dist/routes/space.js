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
exports.spaceRouter = void 0;
const client_1 = __importDefault(require("@repo/db/client"));
const express_1 = require("express");
const user_1 = require("../middleware/user");
const types_1 = require("../types");
exports.spaceRouter = (0, express_1.Router)();
exports.spaceRouter.post("/", user_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("endopibnt");
    const parsedData = types_1.CreateSpaceSchema.safeParse(req.body);
    if (!parsedData.success) {
        console.log(JSON.stringify(parsedData));
        res.status(400).json({ message: "Validation failed" });
        return;
    }
    if (!parsedData.data.mapId) {
        const space = yield client_1.default.space.create({
            data: {
                name: parsedData.data.name,
                width: parseInt(parsedData.data.dimensions.split("x")[0]),
                height: parseInt(parsedData.data.dimensions.split("x")[1]),
                creatorId: req.userId,
            },
        });
        res.json({ spaceId: space.id });
        return;
    }
    const map = yield client_1.default.map.findFirst({
        where: {
            id: parsedData.data.mapId,
        },
        select: {
            mapElements: true,
            width: true,
            height: true,
        },
    });
    console.log("after");
    if (!map) {
        res.status(400).json({ message: "Map not found" });
        return;
    }
    console.log("map.mapElements.length");
    console.log(map.mapElements.length);
    let space = yield client_1.default.$transaction(() => __awaiter(void 0, void 0, void 0, function* () {
        const space = yield client_1.default.space.create({
            data: {
                name: parsedData.data.name,
                width: map.width,
                height: map.height,
                creatorId: req.userId,
            },
        });
        yield client_1.default.spaceElements.createMany({
            data: map.mapElements.map((e) => ({
                spaceId: space.id,
                elementId: e.elementId,
                x: e.x,
                y: e.y,
            })),
        });
        return space;
    }));
    console.log("space crated");
    res.json({ spaceId: space.id });
}));
exports.spaceRouter.delete("/element", user_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("spaceElement?.space1 ");
    const parsedData = types_1.DeleteElementSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Validation failed" });
        return;
    }
    const spaceElement = yield client_1.default.spaceElements.findFirst({
        where: {
            id: parsedData.data.id,
        },
        include: {
            space: true,
        },
    });
    console.log(spaceElement === null || spaceElement === void 0 ? void 0 : spaceElement.space);
    console.log("spaceElement?.space");
    if (!(spaceElement === null || spaceElement === void 0 ? void 0 : spaceElement.space.creatorId) ||
        spaceElement.space.creatorId !== req.userId) {
        res.status(403).json({ message: "Unauthorized" });
        return;
    }
    yield client_1.default.spaceElements.delete({
        where: {
            id: parsedData.data.id,
        },
    });
    res.json({ message: "Element deleted" });
}));
exports.spaceRouter.delete("/:spaceId", user_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req.params.spaceId", req.params.spaceId);
    const space = yield client_1.default.space.findUnique({
        where: {
            id: req.params.spaceId,
        },
        select: {
            creatorId: true,
        },
    });
    if (!space) {
        res.status(400).json({ message: "Space not found" });
        return;
    }
    if (space.creatorId !== req.userId) {
        console.log("code should reach here");
        res.status(403).json({ message: "Unauthorized" });
        return;
    }
    yield client_1.default.space.delete({
        where: {
            id: req.params.spaceId,
        },
    });
    res.json({ message: "Space deleted" });
}));
exports.spaceRouter.get("/all", user_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const spaces = yield client_1.default.space.findMany({
        where: {
            creatorId: req.userId,
        },
    });
    res.json({
        spaces: spaces.map((s) => ({
            id: s.id,
            name: s.name,
            thumbnail: s.thumbnail,
            dimensions: `${s.width}x${s.height}`,
        })),
    });
}));
exports.spaceRouter.post("/element", user_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = types_1.AddElementSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Validation failed" });
        return;
    }
    const space = yield client_1.default.space.findUnique({
        where: {
            id: req.body.spaceId,
            creatorId: req.userId,
        },
        select: {
            width: true,
            height: true,
        },
    });
    if (req.body.x < 0 ||
        req.body.y < 0 ||
        req.body.x > (space === null || space === void 0 ? void 0 : space.width) ||
        req.body.y > (space === null || space === void 0 ? void 0 : space.height)) {
        res.status(400).json({ message: "Point is outside of the boundary" });
        return;
    }
    if (!space) {
        res.status(400).json({ message: "Space not found" });
        return;
    }
    yield client_1.default.spaceElements.create({
        data: {
            spaceId: req.body.spaceId,
            elementId: req.body.elementId,
            x: req.body.x,
            y: req.body.y,
        },
    });
    res.json({ message: "Element added" });
}));
exports.spaceRouter.get("/:spaceId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const space = yield client_1.default.space.findUnique({
        where: {
            id: req.params.spaceId,
        },
        include: {
            elements: {
                include: {
                    element: true,
                },
            },
        },
    });
    if (!space) {
        res.status(400).json({ message: "Space not found" });
        return;
    }
    res.json({
        dimensions: `${space.width}x${space.height}`,
        elements: space.elements.map((e) => ({
            id: e.id,
            element: {
                id: e.element.id,
                imageUrl: e.element.imageUrl,
                width: e.element.width,
                height: e.element.height,
                static: e.element.static,
            },
            x: e.x,
            y: e.y,
        })),
    });
}));
