import { Schema, model } from 'mongoose';

const RoleSchema = Schema({
    
    role: {
        type: String,
        required: [ true, 'Mandatory Role' ],
    },
});

const Role = model('Role', RoleSchema);

export{
    Role
}