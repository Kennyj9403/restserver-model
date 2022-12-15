import { response } from "express"

const isAdminRole = ( req, res = response, next ) =>{

    if( !req.user ){
        return res.status(500).json({
            msg: 'error in role validation, you must validate the token first'
        });
    }
    const { role, name } = req.user;
    if ( role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} do not have an admin role`
        })
    }

    next();

}

const hasRole = ( ...roles ) =>{

    return(req, res = response, next) =>{

        if( !req.user ){
            return res.status(500).json({
                msg: 'error in role validation, you must validate the token first'
            });
        }

        console.log(req.user.role)

        if ( !roles.includes( req.user.role ) ) {
            return res.status(401).json({
                msg: `the service need one of this roles: ${ roles }`
            })
        }

        next();
    }

}

export{
    isAdminRole,
    hasRole
}