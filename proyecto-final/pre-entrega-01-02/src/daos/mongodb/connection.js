import mongoose from 'mongoose';

const connectionString = 'mongodb://localhost:27017/superM';

export const initMongoDB = async () => {
    try {
        await mongoose.connect(connectionString);
        console.log('DB Connected');
    } catch (error) {
        throw new Error(error);
    }
}