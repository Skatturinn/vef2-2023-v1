function template(title, content) {
	return `<!doctype html>
  <html lang="is">
	<head>
	  <meta charset="utf-8">
	  <title>${title}</title>
	  <link rel="stylesheet" href="../public/styles.css">
	</head>
	<body>${content}</body>
  </html>`;
}


function table_template(tbody) {
	return `<table>
	<thead>
	  <tr>
		<th>Númer</th>
		<th>Heiti</th>
		<th>Einingar</th>
		<th>Kennslummisseri</th>
		<th>Námsstig</th>
		<th>Hlekkur</th>
	  </tr>
	</thead>
	<tbody>
		${linur}
	</tbody>
  </table>`


}