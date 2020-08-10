const moment = require('moment')

const { getRoomData, getWeekSchedule } = require('./schedule.utils')
const testSchedule = require('../TestSchedule')

const { campus, types } = require('./constants')


describe('Schedule', () => {
	it('Should get an week schedule by room name and day', () => {
		expect.assertions(1)
		return getWeekSchedule('N419  (Cap.: 24)', moment('2020-05-09', 'YYYY-MM-DD'))
			.then(schedule => {
				expect(schedule).toEqual(testSchedule)
			})
	}, 10000)
})


describe('Get Room Data', () => {
	it('Should process an "Aula"', () => {
		const date = moment('2020-05-07', 'YYYY-MM-DD')
		expect(getRoomData('B01  (Cap.: 40)', date)).toEqual({
			room: 126,
			type: types['Aula'],
			campus: campus['Campiña Paisajista'],
			date
		})
	})

	it('Should process an "Laboratorio"', () => {
		const date = moment('2020-05-07', 'YYYY-MM-DD')
		expect(getRoomData('N419  (Cap.: 24)', date)).toEqual({
			room: 39,
			type: types['Laboratorio'],
			campus: campus['Campiña Paisajista'],
			date
		})
	})
})


