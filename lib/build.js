import path from 'path';
import fs from 'fs/promises';
import { tabletemplate, template } from './html.js';
import { skrifa } from './readandwrite.js';
import { isPathValid } from './prufur.js';

// File path
const filePath = path.join('data', 'index.json');

let indexfile = await fs.readFile(filePath, 'utf8', (err, data) => {
	if (err) {
		console.error('Error reading the file:', err);
		return;
	}
	// Parse the JSON, data fengið frá chatgpt
	try {
		const jsonData = JSON.parse(data);
		return jsonData;
	} catch (parseError) {
		console.error('Error parsing JSON:', parseError);
	}
});
try {
	indexfile = JSON.parse(indexfile);
} catch (parseError) {
	console.error('Error parsing JSON:', parseError);
}
// Athugum hvort dist sé til, ef ekki búum við hana til.
const direct = path.join('dist');
let a = await isPathValid(direct)
if (!a) {
	fs.mkdir(direct)
}
// Athugum hvort index.json object yfir deildir sé gilt, skrifum svo skrárnar
if (indexfile) {
	const loford = indexfile.map(async (stak) => {
		const table = tabletemplate(await skrifa(path.join('data', stak.csv)))
		const header = `<h1>${stak.title}</h1>
		<p>${stak.description}</p>`
		const htmlstrengur = template(stak.title, header, table, `<a href="/" class="tbaka">Til baka</a>`)
		const href = `${stak.csv.slice(0, -3)}html`;
		fs.writeFile(path.join('dist', href), htmlstrengur);
		return `<li class="card">
		<a href='./${href}'>
		<h2>${stak.title}</h2>
		<p>${stak.description}</p>
		</a>
	</li>`;
	});
	Promise.all(loford).then(stak => {
		const indexstrengur = `<ul class="cardtainer">
		${stak.join('')}
		</ul>`;
		const indextitle = 'Vefforitun kennsluskrá HÍ';
		const wfile = template(indextitle, `<h1>${indextitle}</h1><p>Vef2-23-v1</p>`, indexstrengur,
			``);
		fs.writeFile(path.join('dist', 'index.html'), wfile);
	})
}