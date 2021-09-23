import test from 'ava';

import { awsSecretLoader } from './awsSecretLoader';
import { setSecretManagerClientClass } from './secretManagerClient';

test('double', async (t) => {
  setSecretManagerClientClass((() => {
    return {
      send: () => ({
        SecretString: JSON.stringify({
          STRING_VALUE: 'IPSUM',
          TRUE_VALUE: true,
          FALSE_VALUE: false,
        }),
      }),
    };
  }) as any);

  await awsSecretLoader({
    SecretId: '123',
  });
  const env = process.env as any;
  t.deepEqual(env.STRING_VALUE, 'IPSUM');
  t.deepEqual(env.TRUE_VALUE, true);
  t.deepEqual(env.FALSE_VALUE, false);
});
