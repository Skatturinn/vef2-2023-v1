export function template(title, header, main, footer) {
	return (
		`<!DOCTYPE html>
  		<html lang="is">
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>${title}</title>
				<link rel="stylesheet" href="./styles.css">
				<script type="module" src="scripts.js"></script>
			</head>
			<body>
				<a href="#efni" class="sr-only">Tæknibúðin,Beint í efnið.</a>
				<header>${header}</header>
				<main id="efni">${main}</main>
				<footer>
				${footer}
				</footer>
			</body>
  		</html>`);
}
export function table_template(linur) {
	return (
		`<table>
			<thead class="tafla">
				<tr class="row">
					<th>Númer</th>
					<th>Heiti</th>
					<th>Einingar</th>
					<th>Kennslummisseri</th>
					<th>Námsstig</th>
					<th>Kennsluskrá</th>
	  			</tr>
			</thead>
			<tbody class="tafla">
				${linur}
			</tbody>
  		</table>`)
}