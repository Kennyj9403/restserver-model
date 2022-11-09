import { Role } from '../models/role.js';
import { User } from '../models/user.js';

const isValidRole = async( role='' ) => {
    const existingRole = await Role.findOne({ role });
    if (!existingRole) {
        throw new Error(`Role: ${role} is not in BD`)
    }
}

const existingEmail = async( mail='' ) => {
    const existingMail = await User.findOne({ mail });
    if (existingMail) {
        throw new Error(`Email: ${mail} already in BD`)
    }
}

const existingUserById = async( id ) => {
    const existingUserById = await User.findById( id );
    if ( !existingUserById ) {
        throw new Error(`Id: ${id} does not exist in BD`)
    }
}

export{
    existingEmail,
    isValidRole,
    existingUserById
}