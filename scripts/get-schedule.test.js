const moment = require('moment')

const { getSchedule, getRoomData } = require('./get-schedule')

const { campus, types } = require('./constants')

it('Should get schedule by room id', () => {
	const roomData = getRoomData('N419  (Cap.: 24)')

	const options = {
		...roomData,
		date: moment('2020-05-09', 'YYYY-MM-DD')
	}

	return getSchedule(options)
		.then(console.log)
}, 10000)



describe('Get Room Data', () => {
	it('Should process an "Aula"', () => {
		expect(getRoomData('B01  (Cap.: 40)')).toEqual({
			room: 126,
			type: types["Aula"],
			campus: campus["Campiña Paisajista"],
		})
	})

	it('Should process an "Laboratorio"', () => {
		expect(getRoomData('N419  (Cap.: 24)')).toEqual({
			room: 39,
			type: types["Laboratorio"],
			campus: campus["Campiña Paisajista"],
		})
	})
})


