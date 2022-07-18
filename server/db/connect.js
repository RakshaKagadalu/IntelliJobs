import mongoose from 'mongoose';

//Connectiing to the Mongoose db

const connectDB = (url) => {
   // console.log(url)
    return mongoose.connect(url)
}

export default connectDB