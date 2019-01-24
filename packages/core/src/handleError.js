import _ from 'lodash';
import log from './log';

export default function handleError(err, { kill = false }) {
  err = sanitizeErr(err);
  const statusCode = err.code.toString();
  if (statusCode.length && statusCode[0] === '4') {
    log.warn(err.message);
  } else {
    log.error(err.stack);
  }
  if (kill) process.exit(err.code);
}

function sanitizeErr(err) {
  if (err.originalError) err = err.originalError;
  if (err.isJoi) err.code = 400;
  if (err.statusCode) err.code = err.statusCode;
  if (err.output) err.code = err?.output?.statusCode || err.code;
  if (!_.isNumber(err.code)) err.code = 500;
  return err;
}
