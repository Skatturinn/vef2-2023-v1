import { describe, expect, it } from '@jest/globals';
import { lesa, skrifa, isUrlValid } from './readandwrite.js';

describe('lesa', () => {
	let obj1;
	let obj2;
	let obj3;
	let obj4;
	beforeAll(async () => {
		return (obj1 = await lesa('./data/hagfraedi.csv'),
			obj2 = await lesa('./data/tomt.csv'),
			obj3 = await lesa('./data/ologlegt.csv')
		)
	});
	it('tekur inn csv og skilar object', () => {
		expect(obj1).toEqual(expect.any(Object));
		obj1.forEach(resultObject => {
			expect(resultObject).toHaveProperty('Numer');
		});
	})
	it('tekur inn tomt csv og skilar tómu', () => {
		expect(obj2).toEqual([])
	})
	it('tekur inn ologlegt csv og skilar tómu', () => {
		expect(obj3).toEqual([])
	})
})

describe('skrifa', () => {
	it('tekur inn csv og skilar streng fyrir linu i html toflu', async () => {
		expect(await skrifa('./data/hagfraedi.csv')).toContain('<td>');
	})
	it('tekur inn tomt csv og skilar tómu', async () => {
		expect(await skrifa('./data/tomt.csv')).toEqual('')
	})
	it('tekur inn ologlegt csv og skilar tómu', async () => {
		expect(await skrifa('./data/ologlegt.csv')).toEqual('')

	})
})

describe('isUrlValid', () => {
	it('tekurinn inn URL skilar true', () => { expect(isUrlValid('https://www.google.com/')).toBe(true) })
	it('tekurinn inn ogild URL skilar true', () => { expect(isUrlValid('google')).toBe(false) })
})