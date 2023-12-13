import fs from 'fs/promises';
import path from 'path';
/**
 * 
 * @param {path} skra slóð á skrá
 * @returns vigur með obj ef gilt
 */
export async function lesa(skra) {
	let vigur = [];
	try {
		const fileContent = await fs.readFile(skra, 'binary')
		const lines = fileContent.split('\n');
		const header = lines[0].split(';');
		const data = lines.slice(1).map(line => line.split(';'));
		if (header.includes('Númer', 'Heiti')) {
			data.forEach((values) => {
				const obj = {};
				header.forEach((key, index) => {
					obj[key] = values[index];
				});
				vigur.push(obj)
			});
		}
	} catch (err) {
		console.error('error', err);
		throw err
	}
	return vigur
}
// console.log(await lesa('./data/laeknadeild.csv'))