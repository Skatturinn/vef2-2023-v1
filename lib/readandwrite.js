import fs from 'fs/promises';
import { isPathValid, isUrlValid } from './prufur.js';
/**
 * @param {path} skra slóð á skrá
 * @returns vigur með obj ef gilt
 */
export async function lesa(skra) {
	const vigur = [];
	const skratest = await isPathValid(skra);
	if (skratest) {
		try {
			const fileContent = await fs.readFile(skra, 'binary')
			const lines = fileContent.split('\n');
			let header = lines[0].split(';');
			if (header.includes('Númer', 'Námstig')) {
				header = header.map(stak => stak.replace(/ú/g, 'u'
				).replace(/á/g, 'a').replace(/\r/g, 'Vefsida').trim() || 'Vefsida')
				const data = lines.slice(1).map(line => line.split(';'));
				data.forEach((values) => {
					const obj = {};
					if (values.length !== 6) { // eigum von á values með lengdina 6
						if (values[0] === '') { // ef fyrsti er auður fjarlægum við hann°° 
							values.shift()
						} else { // annars sameinum bið 2 og 3
							values.splice(1, 2, `${values[1]}: ${values[2]}`)
						}
					}
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
				`<tr class="row">
					<td>${stak.Numer}</td>
					<td>${stak.Heiti}</td>
					<td>${(!Number.isNaN(stak.Einingar.replace(',', '.')) && !(stak.Einingar.includes('.'))) ? stak.Einingar : ''}</td>
					<td>${misseri.includes(stak.Kennslumisseri) ? stak.Kennslumisseri : ''}</td>
					<td>${stak.Namstig ? stak.Namstig : ''}</td>
					<td>${isUrlValid(stak.Vefsida) ? `
					<a href="${(new URL(stak.Vefsida)).href}">
					Skoða
					</a>` : ''}
					</td>
		  		</tr>`
			)
			// console.log(stak.Vefsida)
		}
	}
	)
	return linur
}