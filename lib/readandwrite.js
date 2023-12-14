import fs from 'fs/promises';
import path from 'path';
import { template, table_template } from './html';
// import path from 'path';
/**
 * @param {path} skra slóð á skrá
 * @returns vigur með obj ef gilt
 */
export async function lesa(skra) {
	let vigur = [];
	let skra_test = await fs.access(skra)
		.then(() => {
			return true;
		})
		.catch(() => {
			return false;
		});
	if (skra_test) {
		try {
			const fileContent = await fs.readFile(skra, 'binary')
			const lines = fileContent.split('\n');
			let header = lines[0].split(';');
			if (header.includes('Númer', 'Námstig')) {
				header = header.map(stak => {
					return stak.replace(/ú/g, 'u').replace(/á/g, 'a').replace('\r', 'Vefsida')
				})
				const data = lines.slice(1).map(line => line.split(';'));
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
	}
	return vigur
}
/**
 * tekið frá chatgpt og https://dev.to/davidemaye/how-to-validate-urls-in-javascript-adm
 * @param {String} string 
 * @returns {Boolean}
 */
export function isUrlValid(string) {
	try {
		new URL(string);
		return true;
	} catch (err) {
		return false;
	}
}
/**
 * @param {String} skra slóð á skrá
 * @returns {String} Html kóða fyrir linu i töflu
 */
export async function skrifa(skra) {
	let linur = '';
	const vigur = await lesa(skra);
	if (!vigur.length) {
		return linur
	}
	vigur.forEach(stak => {
		if (stak.Heiti) {
			const misseri = ['Vor', 'Sumar', 'Haust']
			linur += `<tr>
			<td>${stak.Numer}</td>
			<td>${stak.Heiti}</td>
			<td>${(!isNaN(stak.Einingar) && !(stak.Einingar.includes('.'))) ? stak.Einingar : ''}</td>
			<td>${misseri.includes(stak.Kennslumisseri) ? stak.Kennslumisseri : ''}</td>
			<td>${stak.Namstig ? stak.Namstig : ''}</td>
			<td>${isUrlValid(stak.Vefsida) ? stak.Vefsida : ''}</td>
		  </tr>`
		}
	}
	)
	return linur
}