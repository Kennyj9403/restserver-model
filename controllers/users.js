import { response } from 'express';
import { User } from '../models/user.js';
import bcryptjs from 'bcryptjs';


const usersGet = async(req, res = response) => {
    //query params
    // const { q, nombre= 'No name', apikey, page=1, limit } = req.query;
    const { limit = 5, from = 0 } = req.query;
    // const users = await User.find({ status: true })
    //     .skip( Number( from ) )
    //     .limit( Number( limit ) );

    // const total = await User.countDocuments({ status: true });

    const [ total, users ] = await Promise.all([
        User.countDocuments({ status: true }),
        User.find({ status: true })
            .skip( Number( from ) )
            .limit( Number( limit ) )
    ]);

    res.json({
        total,
        users
    })
};

const usersPost = async(req, res = response) => {

    const { name, mail, password, role } = req.body;

    const user = User({ name, mail, password, role });
    //Encript password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );
    //Save BD
    await user.save();

    res.json({
        user
    })
};

const usersPut = async(req, res = response) => {
    //segmentParams
    const {id} = req.params;

    const { _id, password, google, mail, ...rest } = req.body;

    // TODO BD validation
    if( password ){
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, rest );

    res.json(
        user
    )
};

const usersDelete = async(req, res = response) => {

    const { id } = req.params;
    // permanent delete
    // const user = await User.findByIdAndDelete( id );

    const user = await User.findByIdAndUpdate( id, { status: false });

    res.json({
        user
    })
};

const usersPatch = (req, res = response) => {
    res.json({
        "msg": "patch API - controlador" 
    })
};

export{
    usersGet,
    usersDelete,
    usersPatch,
    usersPost,
    usersPut
}