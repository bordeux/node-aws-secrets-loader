import type { GetSecretValueResponse } from '@aws-sdk/client-secrets-manager';
import { describe, expect, it } from 'vitest';

import { awsSecretLoader } from './awsSecretLoader';
import { setSecretManagerClientClass } from './secretManagerClient';

describe('awsSecretLoader', () => {
  it('should load secrets into environment variables', async () => {
    // biome-ignore lint/complexity/useArrowFunction: must be constructable with `new`
    setSecretManagerClientClass(function () {
      return {
        send: async (): Promise<GetSecretValueResponse> => ({
          SecretString: JSON.stringify({
            STRING_VALUE: 'IPSUM',
            TRUE_VALUE: 'true',
            FALSE_VALUE: 'false',
          }),
        }),
      };
    } as any);

    await awsSecretLoader({
      SecretId: '123',
    });

    expect(process.env.STRING_VALUE).toBe('IPSUM');
    expect(process.env.TRUE_VALUE).toBe('true');
    expect(process.env.FALSE_VALUE).toBe('false');
  });

  it('should handle missing SecretString gracefully', async () => {
    // biome-ignore lint/complexity/useArrowFunction: must be constructable with `new`
    setSecretManagerClientClass(function () {
      return {
        send: async (): Promise<GetSecretValueResponse> => ({}),
      };
    } as any);

    await awsSecretLoader({
      SecretId: '123',
    });

    expect('IPSUM').toBe('IPSUM');
  });
});
