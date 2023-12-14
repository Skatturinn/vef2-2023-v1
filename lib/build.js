// import { template, table_template } from "./html";
// import { skrifa } from "./readandwrite";
import path from 'path';
import fs from 'fs/promises';

// File path
const filePath = path.join('data', 'index.json');

const indexfile = fs.readFile(filePath, 'utf8', (err, data) => {
	if (err) {
		console.error('Error reading the file:', err);
		return;
	}
	// Parse the JSON data fengið frá chatgpt
	try {
		const jsonData = JSON.parse(data);
		return jsonData;
	} catch (parseError) {
		console.error('Error parsing JSON:', parseError);
	}
});


if (indexfile) {
	indexfile.forEach(element => {


	});
}