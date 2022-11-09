import mongoose from "mongoose";

const dbConnection = async() =>{
    try {
        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        });

        console.log('BD Online');

        
    } catch (error) {

        console.log(error);
        throw new Error('Error in database')
        
    }
}

export{
    dbConnection
}