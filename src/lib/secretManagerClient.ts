import {
  SecretsManagerClient,
  SecretsManagerClientConfig,
} from '@aws-sdk/client-secrets-manager';

let clientClass: typeof SecretsManagerClient | null = null;
export const getSecretManagerClient = (
  config: SecretsManagerClientConfig
): SecretsManagerClient => {
  if (clientClass === null) {
    return new SecretsManagerClient(config);
  }
  return new clientClass(config);
};

export const setSecretManagerClientClass = (
  classObject: typeof SecretsManagerClient | null = null
): void => {
  clientClass = classObject;
};
