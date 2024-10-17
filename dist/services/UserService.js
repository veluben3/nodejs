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
exports.UserService = void 0;
const Users_1 = __importDefault(require("../models/Users"));
const moment_1 = __importDefault(require("moment"));
const jwtService_1 = require("./jwtService");
const crypto_1 = __importDefault(require("crypto"));
const tokens_1 = __importDefault(require("../models/tokens"));
const token_1 = require("../constants/token");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserService {
    static checkUserExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield Users_1.default.countDocuments({ email })) === 0;
        });
    }
    static getUsersByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return Users_1.default.findOne({ email });
        });
    }
    static isPasswordMatch(password, existingPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcryptjs_1.default.compareSync(password, existingPassword);
        });
    }
    static createUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return Users_1.default.create(body);
        });
    }
    static generateAuthTokens(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessTokenExpires = (0, moment_1.default)().add('240', 'minutes');
            const accessToken = yield (0, jwtService_1.sign)(user._id.toString(), accessTokenExpires, 'stringusage', {
                algorithm: 'HS256',
            });
            const refreshTokenExpires = (0, moment_1.default)().add('1', 'days');
            const refreshToken = yield UserService.generateRandomToken();
            yield tokens_1.default.create({
                user: user._id.toString(),
                token: refreshToken,
                expiresAt: refreshTokenExpires.format(),
                type: token_1.TOKEN_TYPES.REFRESH,
                blacklisted: false
            });
            return {
                accessToken: {
                    token: accessToken,
                    expires: accessTokenExpires.format()
                },
                refreshToken: {
                    token: refreshToken,
                    expires: refreshTokenExpires.format()
                }
            };
        });
    }
    static generateRandomToken() {
        return __awaiter(this, arguments, void 0, function* (length = 66) {
            return crypto_1.default.randomBytes(length).toString('hex');
        });
    }
}
exports.UserService = UserService;
