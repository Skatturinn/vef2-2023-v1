// import { createRequire } from 'node:module';
import fs from 'fs/promises';
import path from 'path';
// const require = createRequire(import.meta.url);

// var fs = require('fs');
/**
 * 
 * @param {path} skra slóð á skrá
 * @returns 
 */
export async function lesa(skra) {
	try {
		const fileContent = await fs.readFile(skra, 'binary')
		const lines = fileContent.split('\n');
		// const matrix = lines.map(line => line.split(';'));
		const header = lines[0].split(';');
		const data = lines.slice(1).map(line => line.split(';'));
		const result = data.map(values => {
			const obj = {};
			header.forEach((key, index) => {
				obj[key] = values[index];
			});
		});
		if ('Númer' in result) {
			return result
		}
		return []
	} catch (err) {
		console.error('error', err);
		throw err
	}
}