import Err from 'err';
import { oc } from 'ts-optchain.macro';
import { Dependancies } from './types';

export default function handleError(
  error: Err | Error,
  { spinner }: Dependancies
) {
  const err: Err = sanitizeErr(error);
  const statusCode = err.code.toString();
  if (statusCode.length && statusCode[0] === '4') {
    return spinner.warn(err.message);
  }
  return spinner.fail(err.stack);
}

function sanitizeErr(err: Partial<Err>): Err {
  if (err.originalError) err = err.originalError;
  if (err.isJoi) err.code = 400;
  if (err.statusCode) err.code = err.statusCode;
  if (err.output) err.code = oc(err).output.statusCode(oc(err).code(500));
  if (typeof err.code !== 'number') err.code = 500;
  if (!err.code) err.code = 500;
  return err as Err;
}
