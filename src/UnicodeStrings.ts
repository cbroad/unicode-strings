
/**
 * Map between characters used in backslash-escaped characters and their values.
 */
const ESCAPE_MAPPINGS: { [key: string]: string} = {
	b: "\x08",
	f: "\x0c",
	n: "\x0a",
	r: "\x0d",
	t: "\x09",
	v: "\x0b",
};

/**
 * Reversal of ESCAPE_MAPPINGS for reverse lookup.
 */
const ESCAPE_MAPPINGS_REV: { [key: string]: string} = Object.entries(ESCAPE_MAPPINGS).reduce( (R, [k,v]) => ( { ...R, [v]:k, } ), {} );

/**
 * Regular Expression identifying unique encoded "characters" in a string.
 */
const ESCAPE_SEQUENCE_REGEX = /\\(?:([bfnrtv])|([0-8]{2})|x([0-9a-f]{2})|u([0-9a-f]{4})|U([0-9a-f]{8})|(.))/g;


/**
 * Transforms a string.  Any unicode characters will be backslash-escaped
 * using the method producing the shortest length possible.
 * 
 * Escape characters encoded include:
 *  * "\b", "\f", "\n", "\r", "\t", "\v"
 *  * "\oo"        - 2-digit octal-value for characters with value<0x20
 *  * "\xXX"       - 2-digit hex-value for characters with value such that 0x80<value<0x100
 *  * "\uXXXX"     - 4-digit hex-value for characters with value such that 0x100<=value<0x10000
 *  * "\UXXXXXXXX" - 8-digit hex-value for characters with value such that value>=0x10000
 * 
 * @param {string} str a string possibly containing unicode characters
 * @returns {string} encoded string
 */
function escape( str: string ): string {
	return str.split("").map(unicodeEscapeChar).join("");
}

/**
 * Transforms a string.  Any escape sequences will be converted to their
 * unicode character equivalents.
 * 
 * Escape characters decoded include:
 *  * "\b", "\f", "\n", "\r", "\t", "\v"
 *  * "\oo"        - 2-digit octal-value for characters with value<0x20
 *  * "\xXX"       - 2-digit hex-value for characters with value such that 0x80<value<0x100
 *  * "\uXXXX"     - 4-digit hex-value for characters with value such that 0x100<=value<0x10000
 *  * "\UXXXXXXXX" - 8-digit hex-value for characters with value such that value>=0x10000
 * 
 * @param {string} str a string possibly containing escaped characters
 * @returns {string} decoded string
 */
function unescape( str: string ): string {
	return str.replace(ESCAPE_SEQUENCE_REGEX, (fullMatch:string, bfnrtvMatch:string, octalMatch:string, hexMatch8:string, hexMatch16:string, hexMatch32:string, otherMatch:string) => {
		if(bfnrtvMatch) { return ESCAPE_MAPPINGS[bfnrtvMatch]; }
		if(octalMatch) { return String.fromCharCode(parseInt(octalMatch, 8)); }
		if(hexMatch8||hexMatch16||hexMatch32) { return String.fromCharCode(parseInt(hexMatch8||hexMatch16||hexMatch32, 16) ); }
		return otherMatch;
	} )
	;
}

export { escape, unescape };

/**
 * Escapes a unicode character.  If the character is escaped, it will be
 * backslash-escaped using the method producing the shortest length possible.
 * 
 * Escape characters encoded include:
 *  * "\b", "\f", "\n", "\r", "\t", "\v"
 *  * "\oo"        - 2-digit octal-value for characters with value<0x20
 *  * "\xXX"       - 2-digit hex-value for characters with value such that 0x80<value<0x100
 *  * "\uXXXX"     - 4-digit hex-value for characters with value such that 0x100<=value<0x10000
 *  * "\UXXXXXXXX" - 8-digit hex-value for characters with value such that value>=0x10000
 * 
 * @param {string} char unicode character to ascii-encode
 * @returns {string} encoded string
 */
function unicodeEscapeChar( char: string ) {
	if( ESCAPE_MAPPINGS_REV[char] )  { return `\\${ESCAPE_MAPPINGS_REV[char]}`; }
	const n = char.charCodeAt(0);
	if(n<0x20)    { return `\\${n.toString(8)}`; }
	if(n<0x80)    { return char; }
	if(n<0x100)   { return `\\x${zeroPadHex(n, 2)}`; }
	if(n<0x10000) { return `\\u${zeroPadHex(n, 4)}`; }
	return `\\U${zeroPadHex(n, 8)}`;
}

/**
 * Generate a zero-padded hexadecimal string representative of a number.
 * @param {number} num number to be converted
 * @param {number} length character length of resultant string
 */
function zeroPadHex(num:number, length:number) {
	return ( "0".repeat(length)+num.toString(16) ).slice(-length);
}