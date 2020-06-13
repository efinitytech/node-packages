# JCSV
Convert JSON to CSV format.

[![npm version](https://img.shields.io/npm/v/@efinitytech/jcsv.svg?style=flat)](https://npmjs.org/package/@efinitytech/jcsv "View this project on npm")

## Usage
```js
const data = [
    { name: 'John', age: 21 },
    { name: 'Kyle', age: 24 },
    { name: 'Linda', age: 23 }
];

const csvString = jcsv(data);
/* output: 
 *"name,age
 * John,21
 * Kyle,24
 * Linda,23"
 */
```

