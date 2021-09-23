import {
  SecretsManagerClient,
  SecretsManagerClientConfig,
} from '@aws-sdk/client-secrets-manager';

let clientClass: typeof SecretsManagerClient = SecretsManagerClient;
export const getSecretManagerClient = (
  config: SecretsManagerClientConfig
): SecretsManagerClient => {
  return new clientClass(config);
};

export const setSecretManagerClientClass = (
  classObject: typeof SecretsManagerClient
): void => {
  clientClass = classObject;
};
