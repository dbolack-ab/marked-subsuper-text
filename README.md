# marked-subsuper-text

Adds superscript and subscript notation to marked.js. Derived from Homebrewery.

## Superscript

Superscript is created by wrapping the text in a single caret (`^`). The wrapped text must ***not*** have leading or trailing spaces.

```
This is ^superscript^.
```

## Subscript

Subscript is performed by wrapping the text in double carets (`^^`). The wrapped text must ***not*** have leading or trailing spaces.

```
This is ^^subscript^^.
```

# Usage
<!-- Show most examples of how to use this extension -->

```js
const marked = require("marked");
const markedSubSuper = require("marked-subsuper-text");

marked.use({ extensions: [markedSubSuper()] });

const html = marked.parse("This is ^^sub^^ and this is ^super^.");
console.log(html);
// <p>This is <sub>sub</sub> and this is <sup>super</sup>.</p>
```
