babel-plugin-transform-console-log-variable-names
-------------------------------------------------

__WARNING: Very very alpha code quality__

Everytime I try to `console.log` a variable's value, I forget to label
the variable and so the logged statements become unuseful and confusing,
especially when used inside a loop—case in point: React's `render`
function, or `componentWillReceiveProps`.


This plugin transforms `console.log` statements that have just variable
labels as arguments and prepends a string that specifies what those
labels are. For example, for the following statements:

```javascript

const a = 12;
const b = 13;
const c = 59;

console.log(a);
console.log(a, b);
console.log(a, b, c);
```

The output would look something like:


```
a: 12
a, b: 12 13
a, b, c: 12, 13, 59
```

Checkout another plugin around `console.log` usage I wrote: https://github.com/kgrz/babel-plugin-console-groupify

Usage
-----

Install the module with:

```
npm install --save babel-plugin-transform-console-log-variable-names
```

Include it in your babel configuration either via `.babelrc` or webpack.
Here's a `.babelrc` example:

```json
{
	"presets": [...],
	"plugins": [
		"transform-console-log-variable-names"
	]
}
```
