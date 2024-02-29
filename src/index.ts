// import 'express-async-errors';
import express, { ErrorRequestHandler, NextFunction } from 'express'
import connectDB from './config/db.config'
import todoRoutes from './routes/link.routes'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 3000
app.use('/api/v1', todoRoutes)

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({ message: err.message });
}
app.use(errorHandler)

const startDB = async () => {
    try {
        await connectDB(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/test')
        console.log('mongo is connected')
        app.listen(port, () => {
            console.log(`server on ${port} port`)
        })
    } catch(e) {
        console.log(e)
    }
}
startDB()





