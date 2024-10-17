import user from "../models/Users";
import {UserRegistration} from "../@types/UserInterface";
import moment from "moment"
import {sign} from "./jwtService";
import crypto from "crypto"
import Token from "../models/tokens";
import {TOKEN_TYPES} from "../constants/token";
import bcrypt from "bcryptjs"

export abstract class UserService {

    static async checkUserExists(email: string): Promise<boolean> {
        return await user.countDocuments({email}) === 0
    }
    static async getUsersByEmail(email: string): Promise<any> {
        return user.findOne({email})
    }

    static async isPasswordMatch(password: string, existingPassword: string) {
        return bcrypt.compareSync(password, existingPassword)
    }

    static async createUser(body: UserRegistration) {
        return user.create(body)
    }

    static async generateAuthTokens(user: any) {
        const accessTokenExpires = moment().add('240', 'minutes')
        const accessToken = await sign(user._id.toString(), accessTokenExpires, 'stringusage', {
            algorithm: 'HS256',
        })

        const refreshTokenExpires = moment().add('1', 'days')
        const refreshToken = await UserService.generateRandomToken()
        await Token.create({
            user: user._id.toString(),
            token: refreshToken,
            expiresAt: refreshTokenExpires.format(),
            type: TOKEN_TYPES.REFRESH,
            blacklisted: false
        })

        return {
            accessToken: {
                token: accessToken,
                expires: accessTokenExpires.format()
            },
            refreshToken: {
                token: refreshToken,
                expires: refreshTokenExpires.format()
            }
        }


    }

    static async generateRandomToken(length = 66) {
        return crypto.randomBytes(length).toString('hex')
    }
}