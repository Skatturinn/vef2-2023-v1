import { describe, expect, it } from '@jest/globals';
import { lesa } from './readandwrite.js';

describe('lesa', () => {
	let obj1;
	let obj2;
	let obj3;

	beforeAll(async () => {
		return (obj1 = await lesa('./data/hagfraedi.csv'),
			obj2 = await lesa('./data/tomt.csv'),
			obj3 = await lesa('./data/ologlegt.csv'))
	});
	it('tekur inn csv og skilar object', () => {
		expect(obj1).toEqual(expect.any(Object));
		obj1.forEach(resultObject => {
			expect(resultObject).toHaveProperty('Númer');
		});
	})
	it('tekur inn tomt csv og skilar tómu', () => {
		expect(obj2).toEqual([])
	})
	it('tekur inn ologlegt csv og skilar tómu', () => {
		expect(obj3).toEqual([])
	})
})

