const {createLogger,format,transports}= require('winston');
const {combine,timestamp,printf} =format;
const LOG_LEVEL=process.env.LOG_LEVEL

// error: 0,warn: 1, info: 2, http: 3,  verbose: 4,debug: 5, silly: 6
 
const myFormat=printf(({level,timestamp,message})=>{
    return `${timestamp} ${level}: ${message}`;
})

const logger=createLogger({
    transports:[
            new transports.Console({
                level:LOG_LEVEL,
                format:combine(timestamp({format:"YY:MM:DD HH:mm:ss"}),format.json(),myFormat)
            })
    ]
});