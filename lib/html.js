export function template(title, header, main, footer) {
	return (
		`<!DOCTYPE html>
  		<html lang="is">
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>${title}</title>
				<link rel="stylesheet" href="./styles.css">
				<script type="module" src="./scripts.js"></script>
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
export function tabletemplate(linur) {
	return (
		`<table>
			<thead class="tafla">
				<tr class="row">
					<th><button class="sort">Númer</button></th>
					<th><button class="sort">Heiti</button></th>
					<th><button class="sort">Einingar</button></th>
					<th><button class="sort">Kennslummisseri</button></th>
					<th><button class="sort">Námsstig</button></th>
					<th><button class="sort">Kennsluskrá</button></th>
	  			</tr>
			</thead>
			<tbody class="tafla">
				${linur}
			</tbody>
  		</table>`)
}