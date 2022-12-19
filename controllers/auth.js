import { response } from "express"
import  bcryptjs  from 'bcryptjs'
import { gererateJWT } from "../helpers/generate-jwt.js";
import { User } from '../models/user.js';
import { googleVerify } from "../helpers/google-verify.js";

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

const googleSingIn = async( req, res = response ) => {

    const { id_token } = req.body;

    try {
        const { name, img, mail } = await googleVerify( id_token );

        let user = await User.findOne({ mail });

        if( !user ){
            //create

            const data = {
                name,
                mail,
                password: '123',
                img,
                google: true,
                role: 'USER_ROLE'
            };
            user = new User( data );
            await user.save();
        }
        // User status
        if( !user.status ){
            return res.status(401).json({
                msg: 'Blocked user, talk to the administrator'
            })
        }

        //JWT
        const token = await gererateJWT( user.id );

        res.json({
            token: token,
            user
        });

    } catch (err) {
        res.status(400).json({
            ok: false,
            msg: 'Token could not be verified',
            err
        })
    }
    
    
}

export{
    login,
    googleSingIn
}