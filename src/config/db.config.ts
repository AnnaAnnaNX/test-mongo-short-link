import mongoose from 'mongoose'

const connectDB = (url: any) => {
    mongoose.connect(url)
}
export default connectDB