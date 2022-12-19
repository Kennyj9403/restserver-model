import { Router } from'express';
import { check } from 'express-validator';
import { googleSingIn, login } from '../controllers/auth.js';
import { inputValidator } from '../middlewares/input-validator.js';

const routerAuth = Router();

routerAuth.post('/login',[
    check('mail', 'Mandatory mail').isEmail(),
    check('password', 'Mandatory password').not().isEmpty(),
    inputValidator
], login );

routerAuth.post('/google',[
    check('id_token', 'Mandatory id_token').not().isEmpty(),
    inputValidator
], googleSingIn );

export{
    routerAuth
}