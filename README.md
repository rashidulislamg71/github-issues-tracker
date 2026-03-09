# JavaScript 5 Questions

## 1️⃣ What is the difference between var, let, and const?

**var**
* Function scoped
* Can be re-declared and updated
* Hoisted with `undefined` value
* Used in older JavaScript

**let**
* Block scoped
* Can be updated but cannot be re-declared in the same scope

**const**
* Block scoped
* Cannot be updated or re-declared
* Must be initialized when declared


## 2️⃣ What is the spread operator (...)?

The **spread operator (`...`)** is used to expand or unpack elements of an array or object.

It is commonly used for:
* Copying arrays
* Merging arrays
* Copying objects

Example:
```javascript
const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4, 5];
```

---

## 3️⃣ What is the difference between map(), filter(), and forEach()?

**map()**
* Creates a new array
* Transforms every element

```javascript
const numbers = [1,2,3];
const doubled = numbers.map(n => n * 2);
```

**filter()**

* Creates a new array
* Returns elements that match a condition

```javascript
const numbers = [1,2,3,4];
const even = numbers.filter(n => n % 2 === 0);
```

**forEach()**

* Loops through the array
* Does not return a new array

```javascript
const numbers = [1,2,3];
numbers.forEach(n => console.log(n));
```


## 4️⃣ What is an arrow function?

An **arrow function** is a shorter way to write functions in JavaScript.

Example:
```javascript
// Normal Function
function add(a, b) {
  return a + b;
}
// Arrow Function
const add = (a, b) => a + b;
```


## 5️⃣ What are template literals?

**Template literals** are used to create strings with embedded variables.

They use **backticks (` `)** instead of quotes.

Example:
```javascript
const name = "Rashid";
const message = `Hello ${name}, welcome to JavaScript!`;
```

