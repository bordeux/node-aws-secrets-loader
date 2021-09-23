type ReturnValue = string | boolean;

/**
 * Normalize value to NodeJS type
 *
 * ### Example (es module)
 * ```js
 * import { normalizeValue } from '@bordeux/node-aws-secrets-loader'
 * normalizeValue('true') // => true
 * ```
 *
 * ### Example (commonjs)
 * ```js
 * const { normalizeValue } = require('@bordeux/node-aws-secrets-loader');
 * normalizeValue('true') // => true
 * ```
 *
 * @param value - Value to normalize
 * @returns ReturnType
 */
export const normalizeValue = (value: string): ReturnValue => {
  if (String(value).toLowerCase() === 'false') {
    return false;
  }

  if (String(value).toLowerCase() === 'true') {
    return true;
  }

  return value;
};
