export function template(title, content) {
	return `<!doctype html>
  <html lang="is">
	<head>
	  <meta charset="utf-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>${title}</title>
	  <link rel="stylesheet" href="../public/styles.css">
	  <script type="module" src="scripts.js"></script>
	</head>
	<body>
	<a href="#efni" class="sr-only">Tæknibúðin,Beint í efnið.</a>
	${content}
	</body>
  </html>`;
}

export function table_template(linur) {
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