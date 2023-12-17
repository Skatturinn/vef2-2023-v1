const sorttakki = document.body.querySelectorAll('.sort')
// Custom sorting function // hugmynd frá chatgpt endurskrifuð fyrir lint
const customSort = (a, b) => {
	if (Number.isNaN(a) && Number.isNaN(b)) {
		return 0; // leave NaN values in their original order
	}
	if (Number.isNaN(a)) {
		return 1; // move NaN to the end of the array
	}
	if (Number.isNaN(b)) {
		return -1; // move NaN to the end of the array
	}
	return a - b; // regular numeric comparison
};
const customStringSort = (a, b) => {
	const isEmptyString = (str) => str === '';
	// einfaldaði isEmptystring frá þvþi sem chatgpt gerði
	// Handling empty strings
	if (isEmptyString(a) && isEmptyString(b)) {
		return 0; // leave empty strings in their original order
	}
	if (isEmptyString(a)) {
		return 1; // move empty strings to the end of the array
	}
	if (isEmptyString(b)) {
		return -1; // move empty strings to the end of the array
	}

	// Regular string comparison
	return b.localeCompare(a);
};

function sorttable(evt) {
	const targclasslist = evt.currentTarget.classList;
	const klass = Array.from(targclasslist);
	const nr = klass[1]
	const feiti = document.body.querySelector('tbody').childNodes
	const sveit = Array.from(feiti)
	const vigur = [];
	sveit.forEach((stak, index) => {
		if (stak.cells) {
			const obj = {};
			const gildi = stak.cells[nr]
			if (gildi.innerText) {
				obj.gildi = gildi.innerText;
			} else {
				obj.gildi = ''
			}
			obj.gamla = index;
			vigur.push(obj)
		}
	});
	let sorted;
	if (nr === '2') {
		vigur.forEach((stak, index) => {
			vigur[index].gildi = parseFloat(String(stak.gildi).replace(',', '.'))
		}
		)
		if (klass.includes('haekkandi')) {
			sorted = vigur.sort((a, b) => customSort(b.gildi, a.gildi));
			targclasslist.remove('haekkandi');
		} else {
			sorted = vigur.sort((a, b) => customSort(a.gildi, b.gildi));
			targclasslist.add('haekkandi');
		}
	} else if (klass.includes('haekkandi')) {
		sorted = vigur.sort((a, b) => customStringSort(a.gildi, b.gildi));
		targclasslist.remove('haekkandi');
	} else {
		sorted = vigur.sort((a, b) => customStringSort(b.gildi, a.gildi));
		targclasslist.add('haekkandi');
	}
	sveit.forEach((stak, index) => {
		if (index < sorted.length) {
			feiti[sorted[index].gamla].style.gridRow = `${index + 1}`
		}
	})
}
sorttakki.forEach((stak, index) => {
	stak.classList.add(`${index}`)
	stak.addEventListener('click', sorttable)
})