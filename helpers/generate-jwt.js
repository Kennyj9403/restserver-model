import jwt from 'jsonwebtoken';



const gererateJWT = ( uid = '') => {

    return new Promise( (resolve, reject) => {

        const payload = { uid };
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err, token ) => {
            if ( err ) {
                console.log( err );
                reject('token could not be generated')
                
            } else {
                resolve( token );
            }
        })
    })
}

export{
    gererateJWT
}