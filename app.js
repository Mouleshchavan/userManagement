import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/db.js'; 
import userRoutes from './routes/userRoutes.js'; 
import chalk from 'chalk';

const app = express();
connectDB();

app.use(bodyParser.json());

app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(chalk.yellow(`Server running on port ${PORT}`)); 
});
