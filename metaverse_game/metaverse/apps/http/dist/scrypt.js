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
exports.compare = exports.hash = void 0;
const node_crypto_1 = require("node:crypto");
/**
 * https://dev.to/advename/comment/24a9e
 */
const keyLength = 32;
/**
 * Has a password or a secret with a password hashing algorithm (scrypt)
 * @param {string} password
 * @returns {string} The salt+hash
 */
const hash = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        // generate random 16 bytes long salt - recommended by NodeJS Docs
        const salt = (0, node_crypto_1.randomBytes)(16).toString("hex");
        (0, node_crypto_1.scrypt)(password, salt, keyLength, (error, derivedKey) => {
            if (error)
                reject(error);
            // derivedKey is of type Buffer
            resolve(`${salt}.${derivedKey.toString("hex")}`);
        });
    });
});
exports.hash = hash;
/**
 * Compare a plain text password with a salt+hash password
 * @param {string} password The plain text password
 * @param {string} hash The hash+salt to check against
 * @returns {boolean}
 */
const compare = (password, hash) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const [salt, hashKey] = hash.split(".");
        // we need to pass buffer values to timingSafeEqual
        const hashKeyBuff = Buffer.from(hashKey, "hex");
        (0, node_crypto_1.scrypt)(password, salt, keyLength, (error, derivedKey) => {
            if (error)
                reject(error);
            // compare the new supplied password with the hashed password using timeSafeEqual
            resolve((0, node_crypto_1.timingSafeEqual)(hashKeyBuff, derivedKey));
        });
    });
});
exports.compare = compare;
