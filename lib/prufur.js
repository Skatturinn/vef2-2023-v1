import fs from 'fs/promises';
/**
 * tekið frá chatgpt og https://dev.to/davidemaye/how-to-validate-urls-in-javascript-adm
 * skoðar hvort URL sé löglegur
 * @param {String} string 
 * @returns {Boolean}
 */
export async function isUrlValid(string) {
	try {
		new URL(await string);
		return true;
	} catch (err) {
		console.error('Error parsing URL:', err);
		return false;
	}
}
/**
 * athugar hvort skra/directory se til
 * @param {String} skra 
 * @returns {Boolean}
 */
export async function isPathValid(skra) {
	return await fs.access(skra)
		.then(() => {
			return true;
		})
		.catch(() => {
			return false;
		});
}