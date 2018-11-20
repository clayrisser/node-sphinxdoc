import { createLogger, format, transports } from 'winston';

const { Console } = transports;

const logger = createLogger({
  level: 'info',
  format: format.json(),
  transports: [new Console({ format: format.simple() })]
});

export function setLevel(...args) {
  return args;
}

export default logger;
