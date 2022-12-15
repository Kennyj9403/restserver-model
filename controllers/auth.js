import { response } from "express"
import  bcryptjs  from 'bcryptjs'
import { gererateJWT } from "../helpers/generate-jwt.js";
import { User } from '../models/user.js';

const login = async(req, res = response) => {

    const { mail, password } = req.body;

    try {

        //mail verification
        const user = await User.findOne({ mail });
        if(!user){
            return res.status(400).json({
                msg: 'Invalid Mail or Password - mail'
            });
        }
        // avtived user
        if(!user.status){
            return res.status(400).json({
                msg: 'Invalid Mail or Password - status'
            });
        }
        //password verification
        const validPassword = bcryptjs.compareSync( password, user.password );
        if(!validPassword){
            return res.status(400).json({
                msg: 'Invalid Mail or Password - password'
            });
        }
        // JWT
        const token = await gererateJWT( user.id );
        
        res.json({
            token
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Something went wrong'
        })
    } 
}

export{
    login
}