# Rankerjs

A light weight NPM module to rank data.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install rankerjs.

```bash
npm i rankerjs
```

## Usage

```javascript
const ranker = require('rankerjs');

returns []
ranker({ useTestData: true })

returns [ 
  { name: 'test-1', rating: 100, rank: 1 },
  { name: 'test-2', rating: 50, rank: 2, tie: true },
  { name: 'test-3', rating: 50, rank: 2, tie: true }
  ]
const testData = [
        { name: 'test-1', rating: 100 },
        { name: 'test-2', rating: 50 },
        { name: 'test-3', rating: 50 },
      ];
ranker({ data: testData, key: 'rating' });

//Additional fields:
//rank:number, tie: boolean

Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

License
[MIT](https://choosealicense.com/licenses/mit/)