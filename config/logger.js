import winston from 'winston';
import chalk from 'chalk';

const { combine, timestamp, printf } = winston.format;


const customFormat = printf(({ level, message, timestamp }) => {
    const color = level === 'info' ? chalk.yellow : chalk.white;
    return `${chalk.cyan(timestamp)} ${color(level.toUpperCase())}: ${message}`;
});


const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        customFormat
    ),
    transports: [
        new winston.transports.Console()
    ]
});

export default logger;
