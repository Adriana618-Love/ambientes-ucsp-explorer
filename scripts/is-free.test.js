const testSchedule = require('../test/ExampleSchedule')
const { isFree } = require('./is-free')

describe('Test if an room is free by the date', () => {
	test('When its too early, then all rooms are free', () => {
		expect(isFree(testSchedule, new Date('2020-05-07 6:59:00'))).toBe(true)
	})

	test('When begin an class, then the room its not occupied', () => {
		expect(isFree(testSchedule, new Date('2020-05-07 8:30:00'))).toBe(false)
	})

	it('When the class is almost over, then the room its still occupied', () => {
		expect(isFree(testSchedule, new Date('2020-05-07 10:00:00'))).toBe(false)
	})
})
