import mongoose from 'mongoose';
import chalk from 'chalk';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://mouleshchavan:TJwawVLK0kxEolAe@cluster0.a5qb2.mongodb.net/user-management', {
        });
        console.log(chalk.yellow('MongoDB connected'));
    } catch (err) {
        console.error(chalk.red('Error connecting to MongoDB:', err.message));
        process.exit(1);
    }
};

export default connectDB;
