"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMapSchema = exports.CreateAvatarSchema = exports.UpdateElementSchema = exports.CreateElementSchema = exports.AddElementSchema = exports.DeleteElementSchema = exports.CreateSpaceSchema = exports.UpdateMetadataSchema = exports.SigninSchema = exports.SignupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.SignupSchema = zod_1.default.object({
    username: zod_1.default.string(),
    password: zod_1.default.string(),
    type: zod_1.default.enum(["user", "admin"]),
});
exports.SigninSchema = zod_1.default.object({
    username: zod_1.default.string(),
    password: zod_1.default.string(),
});
exports.UpdateMetadataSchema = zod_1.default.object({
    avatarId: zod_1.default.string(),
});
exports.CreateSpaceSchema = zod_1.default.object({
    name: zod_1.default.string(),
    dimensions: zod_1.default.string().regex(/^[0-9]{1,4}x[0-9]{1,4}$/),
    mapId: zod_1.default.string().optional(),
});
exports.DeleteElementSchema = zod_1.default.object({
    id: zod_1.default.string(),
});
exports.AddElementSchema = zod_1.default.object({
    spaceId: zod_1.default.string(),
    elementId: zod_1.default.string(),
    x: zod_1.default.number(),
    y: zod_1.default.number(),
});
exports.CreateElementSchema = zod_1.default.object({
    imageUrl: zod_1.default.string(),
    width: zod_1.default.number(),
    height: zod_1.default.number(),
    static: zod_1.default.boolean(),
});
exports.UpdateElementSchema = zod_1.default.object({
    imageUrl: zod_1.default.string(),
});
exports.CreateAvatarSchema = zod_1.default.object({
    name: zod_1.default.string(),
    imageUrl: zod_1.default.string(),
});
exports.CreateMapSchema = zod_1.default.object({
    thumbnail: zod_1.default.string(),
    dimensions: zod_1.default.string().regex(/^[0-9]{1,4}x[0-9]{1,4}$/),
    name: zod_1.default.string(),
    defaultElements: zod_1.default.array(zod_1.default.object({
        elementId: zod_1.default.string(),
        x: zod_1.default.number(),
        y: zod_1.default.number(),
    })),
});
