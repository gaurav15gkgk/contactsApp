//importing libraries
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import morgan from 'morgan';

//importing routes
import userRoutes from './routes/user.js'
import contactsRoutes from './routes/contacts.js'
import csvRoutes from './routes/csv.js'

const app = express()
dotenv.config();

app.use(morgan('tiny'))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//using routes
app.use('/user', userRoutes)
app.use('/contacts', contactsRoutes)
app.use('/csv', csvRoutes)



//using keys from env
const port = process.env.PORT
const mongodb_uri = process.env.MONGODB_URI

//mongodb connection
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

//express server listen
app.listen(port, (err) => {
    if(err){
        console.log("Error in starting the server")
    }
    else console.log(`Server started at http://localhost:${port}`)
})