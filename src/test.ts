import * as UnicodeStrings from "./UnicodeStrings"

const str = "Hi\nI'm\t칼"

console.log( str );
console.log( UnicodeStrings.escape( str ) );
console.log( UnicodeStrings.unescape( UnicodeStrings.escape( str ) ) );