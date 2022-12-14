import express from'express';
import cors from 'cors';
import { router } from '../routes/users.js';
import { dbConnection } from '../db/config.js';

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersRouterPath = '/api/users'
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

        this.app.use( this.usersRouterPath, router);
        
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