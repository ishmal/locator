/**
 * Get the ordinal position of a letter: 'a'-'z' -> 0-26    
 */
const charAt = (str, pos) => {
	return str.charCodeAt(pos) - 97
}

/**
 * Get the ordinal position of a digit:  '0'-'9' -> 0-9  
 */
const numAt = (str, pos) => {
	return str.charCodeAt(pos) - 48
}

const toChar = (ascii) => {
	return String.fromCharCode(ascii);
}

/**
 * Class for converting between Maidenhead locator and
 * decimal latitude and longitude
 */
class Locator {
	constructor() {

	}

	/**
	 * Parse a locator string    
	 * @param {String} locator a locator string in the form "AANNaann"
	 * @return an array with the degree boundaries of the grid
	 *   rectangle, in left, bottom, width, height order. If the string
	 *   is not parseable, return null.
	 */
	locatorToLatLon(locator) {

		/**
		 * The regex works like this.  The first 2 characters are required.
		 * The optionals allow all 4 pairs.  The value of 'match' will be:
		 *    no match/malformed : null
		 *    "bl"               : ["bl", "bl", null, null, null]
		 *    "bl11"             : ["bl11", "bl", "11", null, null]
		 *    "bl11bh"           : ["bl11bh", "bl", "11", "bh", null ]
		 *    "bl11bh16"         : ["bl11bh16", "bl", "11", "bh", "16" ]
		 * Notice that match[0] will always be the whole string
		 */
		locator = locator.toLowerCase().replace(/\s/g, ""); // remove whitespace
		const regex = /([a-r]{2})(?:(\d{2})(?:([a-x]{2})(\d{2})?)?)?/g;
		const match = regex.exec(locator);
		if (!match)
			return null;
		const field = match[1];
		const square = match[2];
		const subSquare = match[3];
		const extSquare = match[4];

		let latRes = 10;
		let lonRes = 20;
		let lat = charAt(field, 1) * latRes - 90;
		let lon = charAt(field, 0) * lonRes - 180;
		if (square) {
			latRes /= 10;
			lonRes /= 10;
			lat += numAt(square, 1) * latRes;
			lon += numAt(square, 0) * lonRes;
			if (subSquare) {
				latRes /= 24;
				lonRes /= 24;
				lat += charAt(subSquare, 1) * latRes;
				lon += charAt(subSquare, 0) * lonRes;
				if (extSquare) {
					latRes /= 10;
					lonRes /= 10;
					lat += numAt(extSquare, 1) * latRes;
					lon += numAt(extSquare, 0) * lonRes;
				}
			}
		}
		return {
			x: lon,
			y: lat,
			width: lonRes,
			height: latRes,
			cx: lon + lonRes * 0.5,
			cy: lat + latRes * 0.5
		};
	}

	/**
	 * Convert floating point lat and long coordinate to maidenhead
	 * and formatted lat and lon
	 * @param {number} lat the decimal latitude
	 * @param {number} lon the decimal longitude
	 * @return {String} the Maidenhead locator corresponding to the
	 *     coordinates
	 */
	latLonToLocator(lat, lon) {
		let str = "";

		// field
		lon += 180;
		lat += 90;
		let lonRes = 20;
		let latRes = 10;
		str += toChar(Math.floor(lon / lonRes) + 65);
		str += toChar(Math.floor(lat / latRes) + 65);

		// square
		lon %= lonRes;
		lat %= latRes;
		lonRes /= 10;
		latRes /= 10;
		str += Math.floor(lon / lonRes);
		str += Math.floor(lat / latRes);

		// subsquare
		lon %= lonRes;
		lat %= latRes;
		lonRes /= 24;
		latRes /= 24;
		str += toChar(Math.floor(lon / lonRes) + 97);
		str += toChar(Math.floor(lat / latRes) + 97);

		// extsquare
		lon %= lonRes;
		lat %= latRes;
		lonRes /= 10;
		latRes /= 10;
		str += Math.floor(lon / lonRes)
		str += Math.floor(lat / latRes)

		return str;
	}

}

module.exports = Locator;