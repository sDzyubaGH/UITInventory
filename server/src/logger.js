import winston from 'winston'
import 'dotenv/config'

const { NODE_ENV } = process.env

const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({
      level: 'error',
      filename: 'error.log'
    }),
    new winston.transports.File({
      level: 'info',
      filename: 'combined.log'
    })
  ]
})

if (NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }))
}

export { logger }