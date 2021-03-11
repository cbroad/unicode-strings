# unicode-strings

**About**

The unicode-strings was written to make 


**1. Installation**
```shell
npm install git+https://github.com/cbroad/unicode-strings.git
```

**2. Importing**

*ES6 Syntax*
```javascript
import * as UnicodeStrings from "unicode-strings"
// Alternatively
import { escapeString, unescapeString } from "unicode-strings"
```

*CommonJS Syntax*

```javascript
const UnicodeStrings = require( "unicode-strings" );
// Alternatively
const { escapeString, unescapeString } = require( "unicode-strings" );
~                               
```

**3. Usage**
```JavaScript
const asciiString = UnicodeStrings.escapeString("Good Morning! おはようございます 🐡");
console.log( escapedString );
// Good Morning! \u304a\u306f\u3088\u3046\u3054\u3056\u3044\u307e\u3059 \ud83d\udc21
const unicodeString = unescapeString("Good Morning! \u304a\u306f\u3088\u3046\u3054\u3056\u3044\u307e\u3059 \ud83d\udc21");
console.log( unescapedString );
// Good Morning! おはようございます 🐡
```