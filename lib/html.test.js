import { describe, expect, it } from "@jest/globals";
import { template, table_template } from "./html.js";

describe('tekurinn inn tolur og streng skilar html streng', () => {
	it('', () => {
		expect(template(1, 2, '3')).toBe(
			`<!DOCTYPE html>
  		<html lang="is">
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>1</title>
				<link rel="stylesheet" href="../public/styles.css">
				<script type="module" src="scripts.js"></script>
			</head>
			<body>
				<a href="#efni" class="sr-only">Tæknibúðin,Beint í efnið.</a>
				<header>2</header>
				<main id="efni">3</main>
			</body>
  		</html>`)
	})
})

describe('tekur inn gildi og skilar html streng', () => {
	expect(table_template(2)).toBe(
		`<table>
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
				2
			</tbody>
  		</table>`)
})
