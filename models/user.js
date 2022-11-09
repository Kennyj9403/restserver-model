import { Schema, model } from 'mongoose';

const UserSchema = Schema({
    name: {
        type: String,
        required:[ true, 'mandatory name' ]
    },
    mail: {
        type: String,
        required:[ true, 'mandatory email' ],
        unique: true
    },
    password: {
        type: String,
        required:[ true, 'mandatory password' ]
    },
    img: {
        type: String,

    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function () {
    const { __v, password, ...user } = this.toObject();
    return user;
}

const User = model('Usuario', UserSchema);

export{
    User
}