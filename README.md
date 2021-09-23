# node-aws-secrets-loader

Tool to automatically load AWS secret to environment variable



 ### Example (es module)
```js
import { awsSecretLoader } from '@bordeux/node-aws-secrets-loader'
await awsSecretLoader({ SecretId: "someSecret" })
```

### Example (commonjs)
```js
const { awsSecretLoader } = require('@bordeux/node-aws-secrets-loader');
await awsSecretLoader({ SecretId: "someSecret" })
* ```
