import { Router } from'express';
import { check } from 'express-validator';
import { 
    usersDelete,
    usersGet,
    usersPatch,
    usersPost,
    usersPut
} from '../controllers/users.js';
import { existingEmail, existingUserById, isValidRole } from '../helpers/db-validators.js';
import { inputValidator } from '../middlewares/input-validator.js';
import { validateJWT } from '../middlewares/jwt-validator.js';
import { hasRole, isAdminRole } from '../middlewares/role-validator.js';

const routerUsers = Router();

routerUsers.get('/', usersGet);

routerUsers.put('/:id',[
    check('id', 'Is not a valid ID').isMongoId(),
    check('id').custom( existingUserById ),
    check('role').custom( isValidRole ),
    inputValidator
], usersPut);

routerUsers.post('/',[
    check('name', 'The name is mandatory').not().isEmpty(),
    check('password', 'The password is mandatory and more than 6 letters').isLength({ min: 6 }),
    check('mail', 'Invalid mail').isEmail(),
    check('mail').custom( existingEmail ),
    // check('role', 'Invalid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    //input role has the same name that role in the function, is not necesary the callback check('role').custom( (role) => isValidRole(role))
    check('role').custom( isValidRole ), 
    inputValidator
] , usersPost);

routerUsers.delete('/:id',[
    validateJWT,
    // isAdminRole,
    hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'Is not a valid ID').isMongoId(),
    check('id').custom( existingUserById ),
    inputValidator
], usersDelete);

routerUsers.patch('/', usersPatch);

export {
    routerUsers
}