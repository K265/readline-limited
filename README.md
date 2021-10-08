# readline-limited
A Node.js package to read a file line by line, with line size limit support.



## Install

```sh
yarn add readline-limited
```



## Usage

```typescript
import { readline } from 'readline-limited';

const MAX_LINE_LENGTH = 4 * 1024 * 1024;
const rl = readline(inputPath, MAX_LINE_LENGTH);

rl.on('line', console.log);
rl.on('error', console.error)

rl.on('close', () => {
  console.log('closed.')
});
```


## License

This is free software under the terms of MIT the license (check the [LICENSE file](/LICENSE) included in this package).

