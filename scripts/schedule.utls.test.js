const moment = require('moment')

const { fetchSchedule, getRoomData, getSchedule } = require('./schedule.utils')
const testSchedule = require('../TestSchedule')

const { campus, types } = require('./constants')


describe('Schedule', () => {
	it('Should fetch an schedule by room name and day', () => {
		const options = {
			...getRoomData('N419  (Cap.: 24)'),
			date: moment('2020-05-09', 'YYYY-MM-DD'),
		}

		expect.assertions(1)
		return fetchSchedule(options)
			.then(schedule => {
				expect(schedule).toEqual(testSchedule)
			})
	}, 10000)

	it('Should get an schedule by room name and day', () => {
		expect.assertions(1)
		return getSchedule('N419  (Cap.: 24)', moment('2020-05-09', 'YYYY-MM-DD'))
			.then(schedule => {
				expect(schedule).toEqual(testSchedule)
			})
	}, 10000)
})


describe('Get Room Data', () => {
	it('Should process an "Aula"', () => {
		expect(getRoomData('B01  (Cap.: 40)')).toEqual({
			room: 126,
			type: types['Aula'],
			campus: campus['Campiña Paisajista'],
		})
	})

	it('Should process an "Laboratorio"', () => {
		expect(getRoomData('N419  (Cap.: 24)')).toEqual({
			room: 39,
			type: types['Laboratorio'],
			campus: campus['Campiña Paisajista'],
		})
	})
})


