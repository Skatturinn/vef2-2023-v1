import fs from 'fs/promises';
import path from 'path';
import { isPathValid, isUrlValid } from './prufur.js';
/**
 * @param {path} skra slóð á skrá
 * @returns vigur með obj ef gilt
 */
export async function lesa(skra) {
	let vigur = [];
	let skra_test = await isPathValid(skra);
	if (skra_test) {
		try {
			const fileContent = await fs.readFile(skra, 'binary')
			const lines = fileContent.split('\n');
			let header = lines[0].split(';');
			if (header.includes('Númer', 'Námstig')) {
				console.log(header)
				header = header.map(stak => {
					return stak.replace(/ú/g, 'u').replace(/á/g, 'a').replace(/\r/g, 'Vefsida').trim() || 'Vefsida';
				})
				console.log(header)
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
			linur += (
				`<tr>
					<td>${stak.Numer}</td>
					<td>${stak.Heiti}</td>
					<td>${(!isNaN(stak.Einingar.replace(',', '.')) && !(stak.Einingar.includes('.'))) ? stak.Einingar : ''}</td>
					<td>${misseri.includes(stak.Kennslumisseri) ? stak.Kennslumisseri : ''}</td>
					<td>${stak.Namstig ? stak.Namstig : ''}</td>
					<td>${isUrlValid(stak.Vefsida) ? `
					<a href="${(new URL(stak.Vefsida)).href}">
					kennsluskrá
					</a>` : 'url villa'}
					</td>
		  		</tr>`
			)
			// console.log(stak.Vefsida)
		}
	}
	)
	return linur
}