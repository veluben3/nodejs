import moment, {Moment} from "moment";
import jsonwebtoken from 'jsonwebtoken'

export const sign = async (user_id: string, expires: Moment, secret: string, options: any) => {
    try {
        const payload = {
            user_id: user_id,
            iat: moment().unix(),
            exp: expires.unix(),
        }
        return jsonwebtoken.sign(payload, secret, options)
    } catch (e) {
        return e;
    }
}