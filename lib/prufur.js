import fs from 'fs/promises';
/**
 * tekið frá chatgpt og https://dev.to/davidemaye/how-to-validate-urls-in-javascript-adm
 * skoðar hvort URL sé löglegur
 * @param {String} string 
 * @returns {Boolean}
 */
export function isUrlValid(string) {
	let a;
	try {
		a = new URL(string);
	} catch (err) {
		console.error('Error parsing URL:', err);
	}
	if (a) {
		return true;
	}
	return false;
}
/**
 * athugar hvort skra/directory se til
 * @param {String} skra 
 * @returns {Boolean}
 */
export async function isPathValid(skra) {
	return fs.access(skra)
		.then(() => true)
		.catch(() => false);
}