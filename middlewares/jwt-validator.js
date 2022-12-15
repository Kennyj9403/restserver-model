import { request, response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

const validateJWT = async(req = request, res = response, next) =>{
    
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({
            msg: 'the token is mandatory'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        const user = await User.findById( uid );

        if (!user) {
            return res.status(401).json({
                msg: 'non-existent user in BD'
            })
        }
        //validate user in bd
        if(!user.status){
            return res.status(401).json({
                msg: 'Invalid Token - User status: false'
            })
        }

        req.user = user;
        next();

    } catch (err) {
        
        console.log(err);
        res.status(401).json({
            msg: 'Invalid Token'
        })
    }
}

export{
    validateJWT
}