/* eslint-disable import/no-extraneous-dependencies */
import { describe, expect, it } from '@jest/globals'
import path from 'path';
import { isUrlValid, isPathValid } from './prufur.js'

describe('isUrlValid', () => {
	it('tekurinn inn URL skilar true', () => { expect(isUrlValid('https://www.google.com/')).toBe(true) })
	it('tekurinn inn ogild URL skilar true', () => { expect(isUrlValid('google')).toBe(false) })
})

describe('isPathValid', () => {
	it('Tekurinn inn path og skilar true',
		async () => { expect(await isPathValid(path.join('data'))).toBe(true) })
	it('Tekurinn inn ogild path og skilar false',
		async () => { expect(await isPathValid('ogild')).toBe(false) })
})