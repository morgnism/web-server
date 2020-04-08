# Notes on ES6

ECMAScript = ESx. ES3...ES6, ESNext

## Variables

```javascript
let a = 'Helo World!';
const b = {};
```

## Functions

```javascript
function a() {} // 'this' defined whenever function is defined

const b = () => {}; // 'this' defined on own scope
```

## Array & Objects

```javascript
const arr = [1, 2, 3, 4, 5];
const [first, ...otherNumbers] = arr;

const obj = { name: 'bob' };
const { name } = obj;
```

## Pormises

```javascript
const p = new Promise((resolve, reject) => {
  if (err) {
    reject(false);
  }
  resolve(true);
});

// old
p.then((val) => console.log(value)).catch((err) => console.log(err));

async function a() {
  return await p;
}
```
