import mongoose, {mongo, Schema} from "mongoose"
import {toJSON} from "./plugins/toJsonPlugin";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        private: true,
    },
    roles: [{
        type: mongoose.Schema.ObjectId,
        ref: "roles"
    }]
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

userSchema.plugin(toJSON)

class UserClass extends mongoose.Model<typeof userSchema>{
    static async isEmailAlreadyExists(email: string){
        return !!(await this.findOne({ email }))
    }
}
userSchema.loadClass(UserClass)
userSchema.pre('save', function (next){
    if (this.isModified('password')) {
        const passwordGenSalt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, passwordGenSalt);
    }
    next()
})
const user = mongoose.model('users', userSchema)

export default user;