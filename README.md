# unicode-strings

## About

The unicode-strings module was written to make transforming strings from Unicode to ASCII simpler.  This transformation may come in useful when trying to use strings with systems that aren't compatible with the extended Unicode character set.


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
```

**3. Usage**
```JavaScript
const asciiString = UnicodeStrings.escapeString("Good Morning! おはようございます 🐡");
console.log( asciiString );
// Good Morning! \u304a\u306f\u3088\u3046\u3054\u3056\u3044\u307e\u3059 \ud83d\udc21
const unicodeString = unescapeString("Good Morning! \\u304a\\u306f\\u3088\\u3046\\u3054\\u3056\\u3044\\u307e\\u3059 \\ud83d\\udc21");
console.log( unicodeString );
// Good Morning! おはようございます 🐡
```

## API
| Function | Description |
| --- | --- |
| [`UnicodeStrings.escapeString()`](#unicodestringsescapestring-str-) | Blah |
| [`UnicodeStrings.unescapeString()`](#unicodestringsunescapestring-str-) | Blah |

<br/><br/>

### UnicodeStrings.escapeString( str ) ###

Transforms a string.  Any unicode characters will be backslash-escaped
using the method producing the shortest length possible.

Escape characters encoded include:
 * "\b", "\f", "\n", "\r", "\t", "\v"
 * "\oo"        - 2-digit octal-value for characters with value<0x20
 * "\xXX"       - 2-digit hex-value for characters with value such that 0x80<value<0x100
 * "\uXXXX"     - 4-digit hex-value for characters with value such that 0x100<=value<0x10000
 * "\UXXXXXXXX" - 8-digit hex-value for characters with value such that value>=0x10000
 
|  |  |
| --- | --- |
| str | a string possibly containing unicode characters |
| *returns* | encoded string |
 
<br/><br/>

### UnicodeStrings.unescapeString( str ) ###

Transforms a string.  Any escape sequences will be converted to their
unicode character equivalents.

Escape characters decoded include:
 * "\b", "\f", "\n", "\r", "\t", "\v"
 * "\oo"        - 2-digit octal-value for characters with value<0x20
 * "\xXX"       - 2-digit hex-value for characters with value such that 0x80<value<0x100
 * "\uXXXX"     - 4-digit hex-value for characters with value such that 0x100<=value<0x10000
 * "\UXXXXXXXX" - 8-digit hex-value for characters with value such that value>=0x10000

|  |  |
| --- | --- |
| str | a string possibly containing escaped characters |
| *returns* | decoded string |
