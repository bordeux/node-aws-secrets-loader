import {
  GetSecretValueCommand,
  GetSecretValueCommandInput,
  SecretsManagerClientConfig,
} from '@aws-sdk/client-secrets-manager';

import { getSecretManagerClient } from './secretManagerClient';

/**
 * Loads secret to environment variable
 *
 * ### Example (es module)
 * ```js
 * import { awsSecretLoader } from '@bordeux/node-aws-secrets-loader'
 * await awsSecretLoader({ SecretId: "someSecret" })
 * ```
 *
 * ### Example (commonjs)
 * ```js
 * const { awsSecretLoader } = require('@bordeux/node-aws-secrets-loader');
 * await awsSecretLoader({ SecretId: "someSecret" })
 * ```
 *
 * @param params - GetSecretValueCommandInput object format.
 * @param config - SecretsManagerClientConfig object
 * @returns Promise<void>
 */
export const awsSecretLoader = async (
  params: GetSecretValueCommandInput,
  config: SecretsManagerClientConfig = {}
): Promise<void> => {
  const client = getSecretManagerClient(config);
  const secretResponse = await client.send(new GetSecretValueCommand(params));
  const secrets = JSON.parse(secretResponse.SecretString || '{}');
  const env: any = process.env;
  for (const key of Object.keys(secrets)) {
    env[key] = String(secrets[key]);
  }
};
