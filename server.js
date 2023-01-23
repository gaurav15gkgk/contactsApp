//importing libraries
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import morgan from 'morgan';

import userRoutes from './routes/user.js'

const app = express()
dotenv.config();

app.use(morgan('tiny'))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/user', userRoutes)

const port = process.env.PORT
const mongodb_uri = process.env.MONGODB_URI


mongoose.connect(mongodb_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("DB connected successfully")
})

mongoose.connection.on('error', err => {
    console.error("err ", err)
    console.error(`DB connection error: ${err.message}`);
});


app.listen(port, (err) => {
    if(err){
        console.log("Error in starting the server")
    }
    else console.log(`Server started at http://localhost:${port}`)
})