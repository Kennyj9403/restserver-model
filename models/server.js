import express from'express';
import cors from 'cors';
import { dbConnection } from '../db/config.js';
import { routerAuth } from '../routes/auth.js';
import { routerUsers } from '../routes/users.js';

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersRouterPath = '/api/users'
        this.authPath        = '/api/auth'
        //BD
        this.dbConnection();
        //Middlewares
        this.middlewares();
        //App routes
        this.routes();
    }
    async dbConnection(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use( cors() );
        //body parser
        this.app.use( express.json() );
        // Public Directory
        this.app.use( express.static('public'));

    }

    routes(){

        this.app.use( this.authPath, routerAuth);
        this.app.use( this.usersRouterPath, routerUsers);
        
    }

    listen(){
        this.app.listen( process.env.PORT, () =>{
            console.log(`Server runing on port ${process.env.PORT}`)
        });
    }

}

export {
    Server
}